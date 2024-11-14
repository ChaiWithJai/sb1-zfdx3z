import { FileText, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DealMemoCardProps {
  dealMemo: string;
  onGenerateMemo: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

export function DealMemoCard({ dealMemo, onGenerateMemo, isGenerating, canGenerate }: DealMemoCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Deal Memo</CardTitle>
          <Lock className="w-5 h-5 text-indigo-600" />
        </div>
        <CardDescription>AI-generated secure deal memo</CardDescription>
      </CardHeader>
      <CardContent>
        {!dealMemo ? (
          <div className="text-center py-6">
            <Button
              onClick={onGenerateMemo}
              disabled={!canGenerate || isGenerating}
              className="w-full max-w-sm"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate Deal Memo"}
            </Button>
            {!canGenerate && (
              <p className="text-sm text-gray-500 mt-2">
                Complete analysis and criteria to generate memo
              </p>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[300px] w-full border rounded-md p-4">
            <div className="prose prose-sm max-w-none">
              {dealMemo}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}