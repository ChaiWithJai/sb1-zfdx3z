import { CriteriaCard } from '@/components/DealRoom/CriteriaCard';
import { useCriteria, useDealRoom } from '@/context/DealRoomContext';

export function CriteriaView() {
  const service = useDealRoom();
  const criteria = useCriteria();

  const handleCriteriaChange = (e: any) => {
    service.send({
      type: 'UPDATE_CRITERIA',
      criteria: { [e.target.name]: e.target.value }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <CriteriaCard
        criteria={criteria}
        onCriteriaChange={handleCriteriaChange}
      />
    </div>
  );
}