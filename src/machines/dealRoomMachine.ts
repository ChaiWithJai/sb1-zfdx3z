import { createMachine } from 'xstate';

export interface DealRoomContext {
  documents: Array<{
    id: string;
    file: File;
    status: 'analyzing' | 'complete' | 'error';
    analysis?: any;
  }>;
  selectedDocId: string | null;
  criteria: {
    creditWorthy: string;
    technicallyViable: string;
    timeline: string;
    cashFlow: string;
  };
  dealMemo: string | null;
}

export const dealRoomMachine = createMachine({
  id: 'dealRoom',
  initial: 'upload',
  predictableActionArguments: true,
  schema: {
    context: {} as DealRoomContext,
    events: {} as
      | { type: 'UPLOAD_DOCUMENTS'; documents: File[] }
      | { type: 'ANALYSIS_COMPLETE'; docId: string; analysis: any }
      | { type: 'ANALYSIS_ERROR'; docId: string }
      | { type: 'SELECT_DOCUMENT'; docId: string }
      | { type: 'UPDATE_CRITERIA'; criteria: Partial<DealRoomContext['criteria']> }
      | { type: 'GENERATE_MEMO' }
      | { type: 'MEMO_GENERATED'; memo: string }
      | { type: 'RESET' }
  },
  context: {
    documents: [],
    selectedDocId: null,
    criteria: {
      creditWorthy: '',
      technicallyViable: '',
      timeline: '',
      cashFlow: ''
    },
    dealMemo: null
  },
  states: {
    upload: {
      on: {
        UPLOAD_DOCUMENTS: {
          target: 'analyzing',
          actions: ['addDocuments']
        }
      }
    },
    analyzing: {
      on: {
        ANALYSIS_COMPLETE: {
          target: 'analysis',
          actions: ['updateDocumentAnalysis', 'selectDocument']
        },
        ANALYSIS_ERROR: {
          target: 'upload',
          actions: ['markDocumentError']
        }
      }
    },
    analysis: {
      on: {
        SELECT_DOCUMENT: {
          actions: ['selectDocument']
        },
        UPDATE_CRITERIA: {
          target: 'criteria',
          actions: ['updateCriteria']
        }
      }
    },
    criteria: {
      on: {
        UPDATE_CRITERIA: {
          actions: ['updateCriteria']
        },
        GENERATE_MEMO: 'generating'
      }
    },
    generating: {
      on: {
        MEMO_GENERATED: {
          target: 'memo',
          actions: ['setDealMemo']
        }
      }
    },
    memo: {
      on: {
        RESET: {
          target: 'upload',
          actions: ['resetState']
        }
      }
    }
  }
}, {
  actions: {
    addDocuments: (context, event) => {
      if (event.type !== 'UPLOAD_DOCUMENTS') return;
      const newDocs = event.documents.map(file => ({
        id: crypto.randomUUID(),
        file,
        status: 'analyzing' as const
      }));
      context.documents.push(...newDocs);
    },
    updateDocumentAnalysis: (context, event) => {
      if (event.type !== 'ANALYSIS_COMPLETE') return;
      const doc = context.documents.find(d => d.id === event.docId);
      if (doc) {
        doc.status = 'complete';
        doc.analysis = event.analysis;
      }
    },
    markDocumentError: (context, event) => {
      if (event.type !== 'ANALYSIS_ERROR') return;
      const doc = context.documents.find(d => d.id === event.docId);
      if (doc) {
        doc.status = 'error';
      }
    },
    selectDocument: (context, event) => {
      if (event.type !== 'SELECT_DOCUMENT') return;
      context.selectedDocId = event.docId;
    },
    updateCriteria: (context, event) => {
      if (event.type !== 'UPDATE_CRITERIA') return;
      context.criteria = { ...context.criteria, ...event.criteria };
    },
    setDealMemo: (context, event) => {
      if (event.type !== 'MEMO_GENERATED') return;
      context.dealMemo = event.memo;
    },
    resetState: (context) => {
      context.selectedDocId = null;
      context.criteria = {
        creditWorthy: '',
        technicallyViable: '',
        timeline: '',
        cashFlow: ''
      };
      context.dealMemo = null;
    }
  }
});