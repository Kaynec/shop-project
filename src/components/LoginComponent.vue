<script setup lang="ts">
import type { FirebaseError } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'vue3-toastify';

const emit = defineEmits(['close'])
const password = ref('')
const email = ref('')

const isPwd = ref(true)

const router = useRouter()
const errorMsg = ref('')

function toggleIsPwd() {
  isPwd.value = !isPwd.value
}

async function loginUser() {
  const auth = getAuth()
  errorMsg.value = ''
  try {
    const res = await signInWithEmailAndPassword(auth, email.value, password.value)

    const user = res.user

    if (!user.emailVerified) {
      toast('Please verify your email first', {
        autoClose: 3000,
        type: 'error',
        position: 'bottom-center',
      })
      return
    }

    const DELAY_FOR_TOAST_TO_SHOW = 2000

    toast('Redirecting to home page', {
      autoClose: DELAY_FOR_TOAST_TO_SHOW,
      type: 'success',
      position: 'bottom-center',
    })
    // Just A Time
    setTimeout(() => {
      router.push('/HomePage')
    }, DELAY_FOR_TOAST_TO_SHOW)
  }
  catch (error) {
    const err = error as FirebaseError
    // errorMsg.value = (errorMap[err.code as keyof typeof errorMap]) ?? err.message
    errorMsg.value = err.message
  }
}
</script>

<template>
  <div class="mt-auto h-80% max-h-130 flex-1 rounded-t-3rem bg-accent px-lg pt-3xl shadow-lg dark-bg-gray-8">
    <h4 class="flex items-center justify-between">
      <span>
        Welcome Back!!!
      </span>
      <CloseIcon @click="emit('close')" />
    </h4>
    <h2 class="mb-5 pb-4 font-semibold leading-10">
      Login
    </h2>
    <form class="w-full text-center" @submit.prevent="loginUser">
      <TheInput v-model="email" autocomplete="email" label="email" type="email" />
      <TheInput v-model="password" autocomplete="password" label="password" :type="isPwd ? 'password' : 'string'">
        <template #right-icon>
          <div v-if="isPwd" class="i-carbon-view" @click="toggleIsPwd()" />
          <div v-else class="i-carbon-view-off" @click="toggleIsPwd()" />
        </template>
      </TheInput>
      <p class="mx-auto my-1 text-red-7 font-500">
        {{ errorMsg }}
      </p>
      <PrimaryButton>
        Login
      </PrimaryButton>
      <RouterLink to="/Register" class="block flex-1 grow pt-2 text-center font-500 !w-full">
        Don't have an account ? <span class="text-primary">Register</span>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>

</style>
