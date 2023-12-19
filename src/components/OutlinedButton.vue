<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button class="w-full b-1 b-primary rounded-xl p-3 text-primary transition-250 focus:ring-4 hover:ring-4 hover:ring-4 focus:ring-accent">
    <Spinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
