<script setup>
import { useDark, useToggle } from '@vueuse/core';
import 'vue3-toastify/dist/index.css';

const isDark = useDark({
  disableTransition: false,
})
const toggleDark = useToggle(isDark)
</script>

<template>
  <RouterView />
</template>
