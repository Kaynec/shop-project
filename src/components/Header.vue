<script setup lang="ts">
defineProps<{
  label: string
  compact?: boolean
}>()

const isDark = useDark({
  disableTransition: false,
})
const toggleDark = useToggle(isDark)

const nav = ref()

defineExpose({
  ref: nav,
})
</script>

<template>
  <nav
    ref="nav"
    class="sticky top-0 z-10 max-h-70 min-h-3rem w-full flex items-center justify-between px-sm py-5 dark:b-none bg-secondary"
    :class="{ 'max-h-130 min-h-40': compact, 'b-b-4 b-b-gray-3': !compact }"
  >
    <!-- Arrow Left -->

    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" @click="$router.back()">
      <path d="M21.483 8.38375H4.466L10.6412 1.7675L8.9915 0L0 9.63375L8.9915 19.2675L10.6412 17.5L4.466 10.8837H21.483V8.38375Z" class="fill-primary" />
    </svg>
    <h6
      v-if="compact"
      class="text-lg font-600"
    >
      {{ label }}
    </h6>
    <h4
      v-else
      class="text-xl font-600"
    >
      {{ label }}
    </h4>

    <button icon-btn @click="toggleDark()">
      <div i-carbon-sun dark:i-carbon-moon />
    </button>
  </nav>
</template>
