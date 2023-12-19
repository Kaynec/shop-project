<script setup lang="ts">
import { useUserState } from '../store/global';

defineOptions({
  name: 'IndexPage',
})

const router = useRouter()

const state = useUserState()
const isAuthenticated = state.isAuthenticated
if (isAuthenticated.value)
  router.replace('/HomePage')
</script>

<template>
  <section class="z-3 mx-auto h-full flex flex-col items-center gap-6 pa-xs pt-20 text-center">
    <img src="../assets/welcome.png" alt="welcome.png" width="550" height="300">
    <h1>
      welcome
    </h1>
    <p class="text-paper">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet.
    </p>
    <div class="w-full flex flex-col gap-2">
      <PrimaryButton
        @click="$router.replace({
          name: '/Register',
        })"
      >
        Create Account
      </PrimaryButton>
      <OutlinedButton
        @click="$router.replace({
          name: '/Login',
        })"
      >
        Login
      </OutlinedButton>
    </div>
  </section>
</template>

<route lang="yaml">
meta:
 layout: default
 requiresNotAuth: true
</route>
