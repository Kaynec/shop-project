<script setup lang="ts">
import { useObjectUrl } from '@vueuse/core'
import { getAuth, sendPasswordResetEmail, updateEmail, updateProfile } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore'
import type { FirebaseStorage } from 'firebase/storage'
import { ref as firebaseRef, getDownloadURL, uploadBytes } from 'firebase/storage'
import { shallowRef } from 'vue'
import { toast } from 'vue3-toastify'
import { useUserState } from '../store/global'

defineOptions({
  name: 'EditProfile',
})

const storage = inject('storage') as FirebaseStorage

const DB = inject('DB') as Firestore

const state = useUserState()

const currentUser = state.currentUser.value

const information = ref({
  displayName: currentUser?.displayName,
  email: currentUser?.email,
  photoURL: currentUser?.photoURL,
  image: '',
})

const file = shallowRef()
const url = useObjectUrl(file)

function onFileChange(event) {
  file.value = event.target.files[0]
}

const isSendingARequest = ref(false)

async function updateUserInformation() {
  const user = useUserState().currentUser!

  const { displayName, email } = information.value

  try {
    isSendingARequest.value = true
    if (file.value) {
      const imagesRef = firebaseRef(storage, `images/${file.value.name}`)
      const uploadedImageRef = (await uploadBytes(imagesRef, file.value)).ref
      const imageUrl = await getDownloadURL(uploadedImageRef)
      information.value.photoURL = imageUrl
    }

    await updateProfile(user.value!, {
      displayName,
      photoURL: information.value.photoURL,
    })
    await updateEmail(user.value!, email!)
    toast('Your profile has succesfully been updated', {
      autoClose: 3000,
      type: 'success',
      position: 'bottom-center',
    })

    // After it's all done we gonna update the users collection looking for the user
    setDoc(doc(DB, 'user', user.value.uid), {
      displayName,
      email,
      profilePicture: information.value.photoURL,
    })
  }
  catch (error) {
    let msg = 'Something wrong happend during updating of your profile'
    if (error && typeof error === 'object' && 'message' in error && error.message)
      msg = error.message as string

    toast(msg, {
      autoClose: 3000,
      type: 'error',
      position: 'bottom-center',
    })
  }
  finally {
    isSendingARequest.value = false
  }
}

const inputRef = ref()

const isSendingAPasswordResetRequest = ref(false)

function sendPasswordResetLink() {
  const auth = getAuth()

  if (!currentUser || !currentUser.email)
    return
  isSendingAPasswordResetRequest.value = true
  sendPasswordResetEmail(auth, currentUser.email)
    .then(() => {
      toast('Password reset email sent', {
        autoClose: 3000,
        type: 'success',
        position: 'bottom-center',
      })
    })
    .catch((error) => {
      toast(error.message, {
        autoClose: 3000,
        type: 'error',
        position: 'bottom-center',
      })
    }).finally(() => {
      isSendingAPasswordResetRequest.value = false
    })
}
</script>

<template>
  <section>
    <!-- header -->
    <Header label="Edit Profile" class="" :compact="true" />
    <!--  -->
    <div class="relative grid mx-auto place-content-center !z-[99] -mb-12 -translate-y-30%">
      <img :src="url ?? currentUser?.photoURL!" width="120" height="120" alt="photoURL" class="aspect-1 b-4 b-gray-3 rounded-full object-cover">
      <button @click="inputRef.click()">
        Change Picture
      </button>
    </div>
    <!--  -->
    <form class="grid gap-2 pa-sm" @submit.prevent="updateUserInformation()">
      <input ref="inputRef" type="file" class="hidden" @change="onFileChange">
      <TheInput v-model="information.displayName" label="name" type="text" />
      <TheInput v-model="information.email" label="email" type="email" />
      <PrimaryButton :loading="isSendingARequest" class="shadow-lg" type="submit">
        Update
      </PrimaryButton>
      <OutlinedButton :loading="isSendingAPasswordResetRequest" class="shadow-lg" type="button" @click="sendPasswordResetLink">
        Request password change
      </outlinedbutton>
    </form>
  </section>
</template>

<route lang="yaml">
layout: loggedIn
</route>
