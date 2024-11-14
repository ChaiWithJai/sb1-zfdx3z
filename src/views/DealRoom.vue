<template>
  <div class="min-h-screen bg-gray-50">
    <SecurityBanner />
    
    <div class="container mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Deal Room</h1>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <LockIcon class="w-4 h-4" />
          <span>Enterprise Security</span>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LockIcon } from 'lucide-vue-next';
import SecurityBanner from '../components/SecurityBanner.vue';
</script>