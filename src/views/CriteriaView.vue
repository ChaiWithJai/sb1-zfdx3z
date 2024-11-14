`<template>
  <div class="container mx-auto p-4">
    <CriteriaCard
      :criteria="criteria"
      @criteria-change="handleCriteriaChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { CriteriaCard } from '@/components/DealRoom/CriteriaCard.vue';
import { useDealRoomStore } from '@/stores/dealRoom';

const store = useDealRoomStore();
const criteria = computed(() => store.criteria);

const handleCriteriaChange = (e: any) => {
  store.updateCriteria({ [e.target.name]: e.target.value });
};
</script>`