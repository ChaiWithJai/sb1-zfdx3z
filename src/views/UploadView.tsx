import { BatchUploadZone } from '@/components/DealRoom/BatchUploadZone';
import { useDealRoom } from '@/context/DealRoomContext';

export function UploadView() {
  const service = useDealRoom();
  const isUploading = service.state.matches('analyzing');

  const handleFilesAccepted = async (files: File[]) => {
    service.send({ type: 'UPLOAD_DOCUMENTS', documents: files });
  };

  return (
    <div className="container mx-auto p-4">
      <BatchUploadZone
        onFilesAccepted={handleFilesAccepted}
        isUploading={isUploading}
      />
    </div>
  );
}