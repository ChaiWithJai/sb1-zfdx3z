<template>
  <div class="w-full">
    <Card>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Batch Document Upload</h3>
          <Shield class="w-5 h-5 text-indigo-600" />
        </div>
        <p class="text-sm text-gray-500">Upload multiple documents for analysis</p>
      </template>

      <div
        @dragenter.prevent="handleDrag"
        @dragleave.prevent="handleDrag"
        @dragover.prevent="handleDrag"
        @drop.prevent="handleDrop"
        :class="[
          'flex flex-col items-center justify-center p-8',
          'border-2 border-dashed rounded-lg transition-colors duration-200',
          dragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-gray-50'
        ]"
      >
        <Upload class="w-12 h-12 text-gray-400 mb-4" />
        <p class="text-sm text-gray-600 mb-2">Drag & drop multiple files or</p>
        <input
          type="file"
          ref="fileInput"
          multiple
          @change="handleFileSelect"
          accept=".pdf,.doc,.docx,.txt,.xls,.xlsx"
          class="hidden"
        />
        <button
          @click="fileInput?.click()"
          class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Select Files
        </button>
        <p class="mt-2 text-xs text-gray-500">
          Support for PDF, Word, Excel, and Text files
        </p>
      </div>

      <div v-if="isUploading" class="mt-4">
        <div class="flex justify-between text-sm mb-1">
          <span>Processing documents...</span>
          <span>{{ uploadProgress }}%</span>
        </div>
        <Progress :value="uploadProgress" />
      </div>
    </Card>

    <Alert class="mt-4">
      <template #icon>
        <AlertCircle class="h-4 w-4" />
      </template>
      Documents will be automatically analyzed after upload
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Upload, Shield, AlertCircle } from 'lucide-vue-next';
import Card from '@/components/ui/card/Card.vue';
import Alert from '@/components/ui/alert/Alert.vue';
import Progress from '@/components/ui/progress/Progress.vue';

const props = defineProps<{
  isUploading: boolean
}>();

const emit = defineEmits<{
  (e: 'filesAccepted', files: File[]): void
}>();

const dragActive = ref(false);
const uploadProgress = ref(0);
const fileInput = ref<HTMLInputElement>();

const handleDrag = (e: DragEvent) => {
  if (e.type === "dragenter" || e.type === "dragover") {
    dragActive.value = true;
  } else {
    dragActive.value = false;
  }
};

const handleDrop = (e: DragEvent) => {
  dragActive.value = false;
  const files = Array.from(e.dataTransfer?.files || []);
  if (files.length) {
    emit('filesAccepted', files);
  }
};

const handleFileSelect = (e: Event) => {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  if (files.length) {
    emit('filesAccepted', files);
  }
};

// Simulate upload progress when isUploading changes
watch(() => props.isUploading, (newVal) => {
  if (newVal) {
    uploadProgress.value = 0;
    const interval = setInterval(() => {
      uploadProgress.value += 10;
      if (uploadProgress.value >= 100) {
        clearInterval(interval);
      }
    }, 200);
  }
});
</script>