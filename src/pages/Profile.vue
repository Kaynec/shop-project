<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'vue3-toastify';
import { useUserState } from '../store/global';

defineOptions({
  name: 'IndexPage',
})

const state = useUserState()

const currentUser = state.currentUser

const router = useRouter()

function signout() {
  const auth = getAuth()

  signOut(auth).then((res) => {
    toast('succesfully logged out', {
      type: 'success',
    })
    state.currentUser.value = {} as any
    router.replace('/')
  })
}
</script>

<template>
  <div class="flex flex-col">
    <!-- header -->
    <Header label="Account" />
    <!--  -->
    <div class="flex items-start justify-center gap-4 pb-4 pt-8">
      <img :src="currentUser?.photoURL!" width="150" height="150" alt="photoURL" class="aspect-1 b-4 b-gray-3 rounded-full object-cover">
      <div class="mt-4 flex flex-col items-start">
        <h5 class="text-#004B84 font-550">
          {{ currentUser?.displayName }}
        </h5>
        <h6 class="text-gray-5">
          {{ currentUser?.email }}
        </h6>
        <PrimaryButton class="mt-5 shadow-lg" @click="$router.push({ name: '/EditProfile' })">
          Edit Account
        </PrimaryButton>
      </div>
    </div>
    <!--  -->
    <div class="z-9 grid mt-2 grow gap-4 overflow-auto px-4 container">
      <DetailCard v-for="i in 5" :key="i">
        Notification
      </DetailCard>
      <DetailCard class="mb-3 text-primary text-white brightness-85 !bg-primary" @click="signout">
        Sign Out
      </DetailCard>
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
