`<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <AnalysisCard
        :analysis-results="selectedDoc?.analysis"
        :is-analyzing="selectedDoc?.status === 'analyzing'"
      />
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Uploaded Documents</h2>
      <DocumentGrid
        :documents="documents"
        :selected-document="selectedDoc"
        @document-select="handleDocumentSelect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { AnalysisCard } from '@/components/DealRoom/AnalysisCard.vue';
import { DocumentGrid } from '@/components/DealRoom/DocumentGrid.vue';
import { useDealRoomStore } from '@/stores/dealRoom';

const route = useRoute();
const store = useDealRoomStore();

const documents = computed(() => store.documents);
const selectedDoc = computed(() => store.selectedDocument);

const handleDocumentSelect = (doc: any) => {
  store.selectDocument(doc.id);
};
</script>`