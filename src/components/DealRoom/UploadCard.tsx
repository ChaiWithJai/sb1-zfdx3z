import { Upload, Lock, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface UploadCardProps {
  onFileUpload: (file: File) => Promise<void>;
}

export function UploadCard({ onFileUpload }: UploadCardProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    try {
      await onFileUpload(file);
    } finally {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <Card className="border-2 border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Secure Document Upload</CardTitle>
          <Shield className="w-5 h-5 text-indigo-600" />
        </div>
        <CardDescription>Upload documents through encrypted channel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-sm text-gray-600 mb-2">Drag & Drop or</p>
          <Input 
            type="file" 
            id="file-input" 
            className="hidden" 
            onChange={handleFileSelect}
            accept=".pdf,.doc,.docx,.txt"
          />
          <Button 
            onClick={() => document.getElementById('file-input')?.click()}
            className="relative"
          >
            <Lock className="w-4 h-4 mr-2" />
            Secure Upload
          </Button>
          <p className="mt-2 text-xs text-gray-500">
            256-bit encrypted transfer • Max 25MB
          </p>
        </div>
        {isUploading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Encrypting and uploading</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}