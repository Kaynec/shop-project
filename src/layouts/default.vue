<script setup lang="ts">

</script>

<template>
  <main class="relative mx-auto max-w-1024px min-h-100dvh w-full flex flex-col items-center container">
    <router-view
      v-slot="{ Component, route }"
      class="z-index-1 mx-auto h-full grow container"
    >
      <transition name="slide-fade" mode="out-in">
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
    <TheFooter v-show="!$route.meta.dontShowFooter" />
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
