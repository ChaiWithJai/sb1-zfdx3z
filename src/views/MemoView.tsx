import { DealMemoCard } from '@/components/DealRoom/DealMemoCard';
import { useDealMemo, useSelectedDocument, useCriteria, useDealRoom } from '@/context/DealRoomContext';
import { useDealAnalysis } from '@/hooks/useDealAnalysis';
import { useState } from 'react';

export function MemoView() {
  const service = useDealRoom();
  const dealMemo = useDealMemo();
  const selectedDoc = useSelectedDocument();
  const criteria = useCriteria();
  const { generateDealMemo } = useDealAnalysis();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateMemo = async () => {
    if (!selectedDoc?.analysis) return;

    setIsGenerating(true);
    try {
      const memo = await generateDealMemo(selectedDoc.analysis, criteria);
      service.send({ type: 'MEMO_GENERATED', memo });
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = selectedDoc?.analysis && Object.values(criteria).every(v => v !== '');

  return (
    <div className="container mx-auto p-4">
      <DealMemoCard
        dealMemo={dealMemo || ''}
        onGenerateMemo={handleGenerateMemo}
        isGenerating={isGenerating}
        canGenerate={canGenerate}
      />
    </div>
  );
}