<script setup lang="ts">
import { useScrollLock } from '@vueuse/core';

defineOptions({
  name: 'Login',
})

const route = useRoute()

const isExpanded = ref(!!route.query.expanded)

function toggleLoginComponent() {
  isExpanded.value = !isExpanded.value
  // console.log('lols')
}

const el = ref<HTMLElement | null>(null)

const isLocked = useScrollLock(el)

let timeOut = null as unknown as NodeJS.Timeout

function onAnimationLeave() {
  timeOut = setTimeout(() => {
    isLocked.value = false
  }, 2500)
}

function onAnimationEnter() {
  clearTimeout(timeOut)
  isLocked.value = true
}
</script>

<template>
  <section ref="el" :class="{ 'pt-25 p-sm': !isExpanded }" class="mx-auto h-full max-w-1024px flex flex-col gap-4 transition-350">
    <img
      class="mx-auto max-h-auto max-w-400px w-80% transition-250"
      :class="{ 'mx-auto max-h-150 -translate-y-5': isExpanded }" src="../assets/login.png" alt="login.png" width="500"
      height="400"
    >
    <div v-if="!isExpanded">
      <PrimaryButton @click="toggleLoginComponent()">
        Login
      </PrimaryButton>
    </div>

    <Transition @enter="onAnimationEnter() " @leave="onAnimationLeave()">
      <LoginComponent v-if="isExpanded" @close="toggleLoginComponent()" />
    </Transition>
  </section>
</template>

<route lang="yaml">
  meta:
   requiresNotAuth: true
   dontShowFooter: true
 </route>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
  transform: translateX(0);

}

.v-enter-from,
.v-leave-to {
  transform: translateY(500px);
  opacity: 0;
}
</style>
