`<template>
  <div class="container mx-auto p-4">
    <DealMemoCard
      :deal-memo="dealMemo"
      :is-generating="isGenerating"
      :can-generate="canGenerate"
      @generate-memo="handleGenerateMemo"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DealMemoCard } from '@/components/DealRoom/DealMemoCard.vue';
import { useDealRoomStore } from '@/stores/dealRoom';

const store = useDealRoomStore();

const dealMemo = computed(() => store.dealMemo);
const isGenerating = computed(() => store.isGeneratingMemo);
const canGenerate = computed(() => store.canGenerateMemo);

const handleGenerateMemo = async () => {
  await store.generateMemo();
};
</script>`