import { FileText, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocumentListProps {
  documents: File[];
  onSelectDocument: (doc: File) => void;
  currentDocument: File | null;
}

export function DocumentList({ documents, onSelectDocument, currentDocument }: DocumentListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded Documents</CardTitle>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No documents uploaded yet</p>
        ) : (
          <ScrollArea className="h-[200px]">
            <ul className="divide-y divide-gray-200">
              {documents.map((doc, index) => (
                <li key={index} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectDocument(doc)}
                    className={currentDocument === doc ? 'bg-gray-100' : ''}
                  >
                    View <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}