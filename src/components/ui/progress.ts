`<template>
  <div class="w-full bg-gray-200 rounded-full h-2">
    <div
      class="bg-indigo-600 h-2 rounded-full transition-all duration-300"
      :style="{ width: `${value}%` }"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number
}>();
</script>`