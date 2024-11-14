import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DealRoom from '../components/DealRoom';

// Mock the hooks
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

vi.mock('@/hooks/useDealAnalysis', () => ({
  useDealAnalysis: () => ({
    analyzeDocument: async () => ({
      keyTopics: ['IRA Compliance'],
      mainPoints: ['Project timeline: 18 months'],
      importantDetails: ['Domestic content requirements met']
    }),
    generateDealMemo: async () => 'Generated Deal Memo'
  })
}));

describe('DealRoom Acceptance Tests', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <DealRoom />
      </BrowserRouter>
    );
  });

  it('completes the full deal memo workflow', async () => {
    const user = userEvent.setup();

    // Step 1: Upload Document
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload/i);
    await user.upload(input, file);

    // Verify document appears in grid
    await waitFor(() => {
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    // Step 2: Document Analysis
    await waitFor(() => {
      expect(screen.getByText('IRA Compliance')).toBeInTheDocument();
    });

    // Step 3: Fill Underwriting Criteria
    await user.click(screen.getByLabelText(/credit worthiness/i));
    await user.click(screen.getByLabelText(/technically viable/i));
    await user.type(screen.getByLabelText(/timeline/i), '18 months');
    await user.type(screen.getByLabelText(/cash flow/i), 'Projected annual revenue $1M');

    // Step 4: Generate Deal Memo
    const generateButton = screen.getByRole('button', { name: /generate deal memo/i });
    await user.click(generateButton);

    // Verify Deal Memo Generation
    await waitFor(() => {
      expect(screen.getByText(/generated deal memo/i)).toBeInTheDocument();
    });

    // Verify URL State
    expect(window.location.search).toContain('step=memo');
  });

  it('handles document analysis errors gracefully', async () => {
    vi.mock('@/hooks/useDealAnalysis', () => ({
      useDealAnalysis: () => ({
        analyzeDocument: async () => { throw new Error('Analysis failed'); }
      })
    }));

    const file = new File(['dummy content'], 'error.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload/i);
    await userEvent.upload(input, file);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });

  it('maintains state through URL parameters', async () => {
    const user = userEvent.setup();

    // Upload and select a document
    const file = new File(['dummy content'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText(/upload/i);
    await user.upload(input, file);

    await waitFor(() => {
      expect(window.location.search).toContain('docId=');
      expect(window.location.search).toContain('step=analysis');
    });

    // Fill criteria
    await user.click(screen.getByLabelText(/credit worthiness/i));
    expect(window.location.search).toContain('step=criteria');

    // Generate memo
    const generateButton = screen.getByRole('button', { name: /generate deal memo/i });
    await user.click(generateButton);
    expect(window.location.search).toContain('step=memo');

    // Reload the page
    window.location.reload();

    // Verify state is maintained
    await waitFor(() => {
      expect(screen.getByText(/generated deal memo/i)).toBeInTheDocument();
    });
  });
});