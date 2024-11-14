import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Document, Analysis, Criteria } from '../types';
import { useDealAnalysis } from '../composables/useDealAnalysis';

export const useDealRoomStore = defineStore('dealRoom', () => {
  const { analyzeDocument, generateDealMemo: generateAIDealMemo } = useDealAnalysis();
  
  // State
  const documents = ref<Document[]>([]);
  const selectedDocId = ref<string | null>(null);
  const criteria = ref<Criteria>({
    creditWorthy: '',
    technicallyViable: '',
    timeline: '',
    cashFlow: ''
  });
  const dealMemo = ref<string>('');
  const isAnalyzing = ref(false);
  const isGeneratingMemo = ref(false);

  // Getters
  const selectedDocument = computed(() => 
    documents.value.find(d => d.id === selectedDocId.value)
  );

  const canGenerateMemo = computed(() => 
    selectedDocument.value?.analysis && 
    Object.values(criteria.value).every(v => v !== '')
  );

  // Actions
  async function uploadDocuments(files: File[]) {
    const newDocs = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      status: 'analyzing' as const,
    }));

    documents.value.push(...newDocs);

    // Process each document
    await Promise.all(newDocs.map(async (doc) => {
      try {
        isAnalyzing.value = true;
        const analysis = await analyzeDocument(doc.file);
        
        const index = documents.value.findIndex(d => d.id === doc.id);
        if (index !== -1) {
          documents.value[index] = {
            ...documents.value[index],
            status: 'complete',
            analysis
          };
        }

        // Select first completed document
        if (!selectedDocId.value) {
          selectedDocId.value = doc.id;
        }
      } catch (error) {
        const index = documents.value.findIndex(d => d.id === doc.id);
        if (index !== -1) {
          documents.value[index] = {
            ...documents.value[index],
            status: 'error'
          };
        }
      } finally {
        isAnalyzing.value = false;
      }
    }));
  }

  function selectDocument(docId: string) {
    selectedDocId.value = docId;
  }

  function updateCriteria(updates: Partial<Criteria>) {
    criteria.value = { ...criteria.value, ...updates };
  }

  async function generateMemo() {
    if (!selectedDocument.value?.analysis) return;

    try {
      isGeneratingMemo.value = true;
      const memo = await generateAIDealMemo(
        selectedDocument.value.analysis,
        criteria.value
      );
      dealMemo.value = memo;
    } finally {
      isGeneratingMemo.value = false;
    }
  }

  return {
    // State
    documents,
    selectedDocId,
    criteria,
    dealMemo,
    isAnalyzing,
    isGeneratingMemo,
    
    // Getters
    selectedDocument,
    canGenerateMemo,
    
    // Actions
    uploadDocuments,
    selectDocument,
    updateCriteria,
    generateMemo
  };
});