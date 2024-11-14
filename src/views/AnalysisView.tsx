import { useParams } from 'react-router-dom';
import { AnalysisCard } from '@/components/DealRoom/AnalysisCard';
import { DocumentGrid } from '@/components/DealRoom/DocumentGrid';
import { useSelectedDocument, useDocuments, useDealRoom } from '@/context/DealRoomContext';

export function AnalysisView() {
  const { docId } = useParams();
  const service = useDealRoom();
  const documents = useDocuments();
  const selectedDoc = useSelectedDocument();

  const handleDocumentSelect = (doc: any) => {
    service.send({ type: 'SELECT_DOCUMENT', docId: doc.id });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnalysisCard
          analysisResults={selectedDoc?.analysis}
          isAnalyzing={selectedDoc?.status === 'analyzing'}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        <DocumentGrid
          documents={documents}
          onDocumentSelect={handleDocumentSelect}
          selectedDocument={selectedDoc}
        />
      </div>
    </div>
  );
}