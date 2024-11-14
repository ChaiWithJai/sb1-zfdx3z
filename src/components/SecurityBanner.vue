<template>
  <div class="bg-indigo-600 text-white text-xs md:text-sm py-2">
    <div class="container mx-auto px-4 flex items-center justify-center text-center space-x-4">
      <div class="flex items-center">
        <ShieldIcon class="w-4 h-4 mr-1" />
        <span class="hidden sm:inline">SOC2 Type II</span>
      </div>
      <div class="flex items-center">
        <LockIcon class="w-4 h-4 mr-1" />
        <span class="hidden sm:inline">256-bit Encryption</span>
      </div>
      <div class="flex items-center">
        <CheckCircleIcon class="w-4 h-4 mr-1" />
        <span class="hidden sm:inline">GDPR Compliant</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldIcon, LockIcon, CheckCircleIcon } from 'lucide-vue-next';
</script>