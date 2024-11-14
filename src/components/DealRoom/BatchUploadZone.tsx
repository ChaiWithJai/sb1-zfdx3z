import { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BatchUploadZoneProps {
  onFilesAccepted: (files: File[]) => Promise<void>;
  isUploading: boolean;
}

export function BatchUploadZone({ onFilesAccepted, isUploading }: BatchUploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Simulate progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);

      await onFilesAccepted(files);
      clearInterval(interval);
      setUploadProgress(0);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      await onFilesAccepted(files);
    }
  };

  return (
    <div className="w-full">
      <Card className={`border-2 ${dragActive ? 'border-indigo-500' : 'border-gray-200'}`}>
        <CardHeader>
          <CardTitle>Batch Document Upload</CardTitle>
          <CardDescription>Upload multiple documents for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`
              flex flex-col items-center justify-center p-8
              border-2 border-dashed rounded-lg
              ${dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'}
              transition-colors duration-200
            `}
          >
            <Upload className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag & drop multiple files or
            </p>
            <input
              type="file"
              multiple
              onChange={handleChange}
              accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
              className="hidden"
              id="batch-file-input"
            />
            <button
              onClick={() => document.getElementById('batch-file-input')?.click()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Select Files
            </button>
            <p className="mt-2 text-xs text-gray-500">
              Support for PDF, Word, Excel, and Text files
            </p>
          </div>

          {isUploading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Processing documents...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <Alert className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Documents will be automatically analyzed after upload
        </AlertDescription>
      </Alert>
    </div>
  );
}