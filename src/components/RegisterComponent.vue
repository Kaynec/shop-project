<script setup lang="ts">
import type { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import { toast } from 'vue3-toastify';

const emit = defineEmits(['close'])
const password = ref('')
const displayName = ref('')
const rePassword = ref('')
const email = ref('')

const isPwd = ref(true)

function toggleIsPwd() {
  isPwd.value = !isPwd.value
}

const router = useRouter()

const errorMsg = ref('')

function validateUserInputs() {
  if (!displayName.value) {
    errorMsg.value = 'Please Enter Your Display Name'

    return false
  }
  if (rePassword.value !== password.value) {
    errorMsg.value = 'Password And Password Confirmation Fields Don\'t Match'

    return false
  }
  errorMsg.value = ''

  return true
}

async function RegisterUser() {
  const isUserValid = validateUserInputs()

  const auth = getAuth()

  if (!isUserValid)
    return

  try {
    const res = await createUserWithEmailAndPassword(auth, email.value, password.value)

    const user = res.user

    updateProfile(user, {
      displayName: displayName.value,
      photoURL: `https://ui-avatars.com/api/?name=${displayName.value}`,
    })

    sendEmailVerification(user).then(() => {
      toast('confirmation message send please check your email', {
        autoClose: 3000,
        type: 'success',
        position: 'bottom-center',
      })
      router.push('/Login')
    })
  }
  catch (error) {
    const err = error as FirebaseError
    errorMsg.value = err.message
  }
}
</script>

<template>
  <div class="mt-auto h-65% max-h-180 rounded-t-3rem bg-accent bg-accent px-lg pt-lg shadow-lg">
    <h2 class="flex items-center justify-between">
      Register
      <CloseIcon @click="emit('close')" />
    </h2>

    <form class="w-full text-center" @submit.prevent="RegisterUser()">
      <TheInput v-model="email" autocomplete="email" label="email" type="email" />
      <TheInput v-model="displayName" autocomplete="display-name" label="Display name" type="text" />
      <TheInput v-model="password" type="text" autocomplete="password" label="password" />
      <TheInput v-model="rePassword" autocomplete="repassword" label="repassword" :type="isPwd ? 'password' : 'string'">
        <template #right-icon>
          <div v-if="isPwd" class="i-carbon-view" @click="toggleIsPwd()" />
          <div v-else class="i-carbon-view-off" @click="toggleIsPwd()" />
        </template>
      </TheInput>
      <p class="mx-auto my-1 text-red-7 font-500">
        {{ errorMsg }}
      </p>
      <PrimaryButton type="submit">
        Register
      </PrimaryButton>
      <RouterLink to="/Login/?expanded=true" class="block flex-1 grow pt-2 text-center font-500 !w-full">
        Already have account? <span class="text-primary">login</span>
      </RouterLink>
    </form>
  </div>
</template>

<style scoped>

</style>
