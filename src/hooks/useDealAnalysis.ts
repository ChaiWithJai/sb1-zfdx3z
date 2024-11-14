import { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true // Enable browser usage
});

export function useDealAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDocument = async (file: File) => {
    setIsAnalyzing(true);
    try {
      // For demo purposes, we'll return mock data
      // In production, we would:
      // 1. Upload file to secure backend
      // 2. Process with OCR if needed
      // 3. Send to Claude via backend API
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing
      
      return {
        keyTopics: ['IRA Compliance', 'Financial Projections', 'Technical Specifications'],
        mainPoints: ['Project timeline: 18 months', 'Estimated ROI: 15%', 'Regulatory approvals pending'],
        importantDetails: ['Domestic content requirements met', 'Apprenticeship program in place']
      };
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateDealMemo = async (analysis: any, criteria: any) => {
    try {
      // In production, we would:
      // 1. Send analysis and criteria to backend
      // 2. Process with Claude via backend API
      // 3. Return formatted memo
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return `
DEAL MEMO ANALYSIS

1. Project Overview
------------------
Based on the provided documentation and analysis, this project demonstrates strong potential with key considerations in the following areas:

- IRA Compliance: Documentation shows alignment with requirements
- Financial Structure: ROI projections meet investment criteria
- Technical Viability: Specifications meet industry standards

2. Risk Assessment
-----------------
Credit Assessment: ${criteria.creditWorthy === 'yes' ? 'Meets Standards' : 'Does Not Meet Standards'}
Technical Viability: ${criteria.technicallyViable === 'yes' ? 'Viable' : 'Not Viable'}
Implementation Timeline: ${criteria.timeline}

3. Financial Analysis
-------------------
${criteria.cashFlow}

4. Recommendation
----------------
Based on the comprehensive analysis of submitted documentation and underwriting criteria, this project is:
${criteria.creditWorthy === 'yes' && criteria.technicallyViable === 'yes' ? 
  '✅ RECOMMENDED FOR APPROVAL' : 
  '❌ NOT RECOMMENDED FOR APPROVAL'}

Additional Notes:
- Implementation timeline appears realistic
- Cash flow projections show sustainable model
- Technical specifications meet requirements
`;
    } catch (error) {
      console.error('Error generating deal memo:', error);
      throw error;
    }
  };

  return {
    analyzeDocument,
    generateDealMemo,
    isAnalyzing
  };
}