import { FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AnalysisCardProps {
  analysisResults: any;
  isAnalyzing: boolean;
}

export function AnalysisCard({ analysisResults, isAnalyzing }: AnalysisCardProps) {
  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Analysis in Progress</CardTitle>
          <CardDescription>Processing through secure AI pipeline...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <div className="animate-pulse flex flex-col items-center">
            <FileText className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600">Analyzing document contents...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Analysis Results</CardTitle>
        <CardDescription>
          Secure analysis through encrypted channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!analysisResults ? (
          <div className="text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4" />
            <p>Upload a document to begin analysis</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-lg">Key Topics</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysisResults.keyTopics.map((topic: string, index: number) => (
                    <li key={index} className="text-gray-700">{topic}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">Main Points</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysisResults.mainPoints.map((point: string, index: number) => (
                    <li key={index} className="text-gray-700">{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-lg">Important Details</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {analysisResults.importantDetails.map((detail: string, index: number) => (
                    <li key={index} className="text-gray-700">{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}