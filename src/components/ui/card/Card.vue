<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <div v-if="$slots.header" class="p-4 border-b">
      <slot name="header" />
    </div>
    <div class="p-4">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-4 border-t bg-gray-50">
      <slot name="footer" />
    </div>
  </div>
</template>