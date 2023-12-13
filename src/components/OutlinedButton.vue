<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button class="hoveer:ring-4 w-full b-1 b-primary rounded-xl p-3 text-primary text-primary transition-250 dark-text-white focus:ring-4 hover:ring-4 focus:ring-accent">
    <Spinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
