import { createContext, useContext, useEffect } from 'react';
import { useInterpret, useSelector } from '@xstate/react';
import { useNavigate } from 'react-router-dom';
import { dealRoomMachine } from '@/machines/dealRoomMachine';
import { useDealAnalysis } from '@/hooks/useDealAnalysis';
import { useToast } from '@/hooks/use-toast';

const DealRoomContext = createContext({} as any);

export function DealRoomProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { analyzeDocument } = useDealAnalysis();
  const { toast } = useToast();

  const service = useInterpret(dealRoomMachine, {
    actions: {
      addDocuments: (context, event) => {
        if (event.type !== 'UPLOAD_DOCUMENTS') return;
        
        event.documents.forEach(async (file) => {
          const docId = crypto.randomUUID();
          try {
            const analysis = await analyzeDocument(file);
            service.send({ type: 'ANALYSIS_COMPLETE', docId, analysis });
            navigate(`/deal-room/${docId}/analysis`);
          } catch (error) {
            service.send({ type: 'ANALYSIS_ERROR', docId });
            toast({
              title: 'Error',
              description: 'Failed to analyze document',
              variant: 'destructive'
            });
          }
        });
      }
    }
  });

  // Sync URL with state
  useEffect(() => {
    const subscription = service.subscribe(state => {
      const { selectedDocId } = state.context;
      if (!selectedDocId) return;

      if (state.matches('analysis')) {
        navigate(`/deal-room/${selectedDocId}/analysis`);
      } else if (state.matches('criteria')) {
        navigate(`/deal-room/${selectedDocId}/criteria`);
      } else if (state.matches('memo')) {
        navigate(`/deal-room/${selectedDocId}/memo`);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, service]);

  return (
    <DealRoomContext.Provider value={service}>
      {children}
    </DealRoomContext.Provider>
  );
}

// Rest of the hooks remain the same
export function useDealRoom() {
  const context = useContext(DealRoomContext);
  if (!context) {
    throw new Error('useDealRoom must be used within DealRoomProvider');
  }
  return context;
}

export function useDocuments() {
  const service = useDealRoom();
  return useSelector(service, state => state.context.documents);
}

export function useSelectedDocument() {
  const service = useDealRoom();
  return useSelector(service, state => {
    const { documents, selectedDocId } = state.context;
    return documents.find(d => d.id === selectedDocId);
  });
}

export function useCriteria() {
  const service = useDealRoom();
  return useSelector(service, state => state.context.criteria);
}

export function useDealMemo() {
  const service = useDealRoom();
  return useSelector(service, state => state.context.dealMemo);
}