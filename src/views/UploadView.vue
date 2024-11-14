<template>
  <div class="container mx-auto p-4">
    <BatchUploadZone
      :is-uploading="isUploading"
      @files-accepted="handleFilesAccepted"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BatchUploadZone from '@/components/DealRoom/BatchUploadZone.vue';
import { useDealRoomStore } from '@/stores/dealRoom';

const store = useDealRoomStore();
const isUploading = computed(() => store.isAnalyzing);

const handleFilesAccepted = async (files: File[]) => {
  await store.uploadDocuments(files);
};
</script>