import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SecurityBanner } from "@/components/SecurityBanner";
import { BatchUploadZone } from "./BatchUploadZone";
import { DocumentGrid } from "./DocumentGrid";
import { AnalysisCard } from "./AnalysisCard";
import { CriteriaCard } from "./CriteriaCard";
import { DealMemoCard } from "./DealMemoCard";
import { useToast } from "@/hooks/use-toast";
import { useDealAnalysis } from "@/hooks/useDealAnalysis";

interface Document {
  id: string;
  file: File;
  status: 'analyzing' | 'complete' | 'error';
  analysis?: any;
}

export default function DealRoom() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const { analyzeDocument, generateDealMemo: generateAIDealMemo } = useDealAnalysis();
  
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [criteria, setCriteria] = useState({
    creditWorthy: '',
    technicallyViable: '',
    timeline: '',
    cashFlow: ''
  });
  const [dealMemo, setDealMemo] = useState('');
  const [isGeneratingMemo, setIsGeneratingMemo] = useState(false);

  // Handle URL state
  const docId = searchParams.get('docId');
  const step = searchParams.get('step') || 'upload';

  const handleFilesAccepted = async (files: File[]) => {
    setIsUploading(true);
    try {
      const newDocs = files.map(file => ({
        id: crypto.randomUUID(),
        file,
        status: 'analyzing' as const
      }));

      setDocuments(prev => [...prev, ...newDocs]);

      // Process each document
      await Promise.all(newDocs.map(async (doc) => {
        try {
          const analysis = await analyzeDocument(doc.file);
          setDocuments(prev => prev.map(d => 
            d.id === doc.id ? { ...d, status: 'complete', analysis } : d
          ));
          
          // Select first completed document and move to analysis step
          navigate(`/deal-room?docId=${doc.id}&step=analysis`);
        } catch (error) {
          setDocuments(prev => prev.map(d => 
            d.id === doc.id ? { ...d, status: 'error' } : d
          ));
        }
      }));

      toast({
        title: "Documents processed",
        description: `Successfully analyzed ${files.length} documents`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process some documents",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocumentSelect = (doc: Document) => {
    setSelectedDocument(doc);
    navigate(`/deal-room?docId=${doc.id}&step=analysis`);
  };

  const handleCriteriaChange = (e: any) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
    navigate(`/deal-room?docId=${docId}&step=criteria`);
  };

  const generateDealMemo = async () => {
    if (!selectedDocument?.analysis) return;

    setIsGeneratingMemo(true);
    try {
      const memo = await generateAIDealMemo(selectedDocument.analysis, criteria);
      setDealMemo(memo);
      navigate(`/deal-room?docId=${docId}&step=memo`);
      toast({
        title: "Deal memo generated",
        description: "Ready for review",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate deal memo",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingMemo(false);
    }
  };

  const canGenerateMemo = selectedDocument?.analysis && Object.values(criteria).every(v => v !== '');

  return (
    <div className="min-h-screen bg-gray-50">
      <SecurityBanner />
      
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Deal Room</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BatchUploadZone 
            onFilesAccepted={handleFilesAccepted}
            isUploading={isUploading}
          />
          <AnalysisCard 
            analysisResults={selectedDocument?.analysis}
            isAnalyzing={selectedDocument?.status === 'analyzing'}
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
          <DocumentGrid
            documents={documents}
            onDocumentSelect={handleDocumentSelect}
            selectedDocument={selectedDocument}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CriteriaCard 
            criteria={criteria}
            onCriteriaChange={handleCriteriaChange}
          />
          <DealMemoCard 
            dealMemo={dealMemo}
            onGenerateMemo={generateDealMemo}
            isGenerating={isGeneratingMemo}
            canGenerate={canGenerateMemo}
          />
        </div>
      </div>
    </div>
  );
}