import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Document {
  file: File;
  status: 'analyzing' | 'complete' | 'error';
  analysis?: any;
}

interface DocumentGridProps {
  documents: Document[];
  onDocumentSelect: (doc: Document) => void;
  selectedDocument?: Document;
}

export function DocumentGrid({ documents, onDocumentSelect, selectedDocument }: DocumentGridProps) {
  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'analyzing':
        return <div className="w-4 h-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'complete':
        return <Badge variant="success">Analysis Complete</Badge>;
      case 'analyzing':
        return <Badge variant="secondary">Analyzing</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
    }
  };

  return (
    <ScrollArea className="h-[400px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {documents.map((doc, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedDocument === doc ? 'ring-2 ring-indigo-500' : ''
            }`}
            onClick={() => onDocumentSelect(doc)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-indigo-600" />
                  <div>
                    <p className="font-medium truncate max-w-[150px]">
                      {doc.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {getStatusIcon(doc.status)}
              </div>
              <div className="mt-4">
                {getStatusBadge(doc.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}