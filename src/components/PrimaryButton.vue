<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<template>
  <button class="w-full rounded-xl bg-primary p-3 text-white transition-250 !mx-auto focus:ring-4 focus:ring-accent hover:brightness-90">
    <Spinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<style scoped>

</style>
