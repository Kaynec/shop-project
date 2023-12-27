<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';

const { height } = useWindowSize()

const route = useRoute()
</script>

<template>
  <main
    class="relative mx-auto max-w-1024px w-full flex flex-col items-center container"
    :style="`height:${height}px !important`"
  >
    <router-view
      v-slot="{ Component, route }"
      class="z-1 mx-auto w-full flex grow flex-col pb-sm"
    >
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
    <TheFooter v-if="!route.meta.dontShowFooter" />
  </main>
</template>

<style scoped>
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>
