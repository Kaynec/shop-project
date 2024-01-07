<script setup lang="ts">
import type { Firestore, Timestamp } from 'firebase/firestore'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { toast } from 'vue3-toastify'
import { useMessages, useUserState } from '../store/global'
import type { Message } from './../types'

defineOptions({
  name: 'IndexPage',
})

const adminImageUrl = import.meta.env.VITE_APP_ADMIN_IMAGE

const state = useUserState()

const { isLoading, results } = useMessages()

const msgs = computed(() => results.value as Message[])

const currentUser = state.currentUser

const router = useRouter()

const text = ref('')
const db = inject('DB') as Firestore

const msgContainer = ref()

async function sendMessage() {
  const userId = currentUser.value.uid
  const msgBody = {
    createdAt: serverTimestamp() as Timestamp,
    msg: text.value,
    sender: 'user',
    contact: userId,
    senderId: currentUser.value.uid,
  }

  if (!text.value)
    return

  const uid = uuid()

  setDoc(doc(db, 'messages', uid), msgBody).then((r) => {
    const height = msgContainer.value.scrollHeight
    msgContainer.value.scrollTo({
      top: height,
      behavior: 'smooth',
    })
  }).catch((e) => {
    toast('something wrong happend when sending your message', {
      autoClose: 2000,
      type: 'error',
      position: 'bottom-center',
    })
  }).finally(() => text.value = '')
}

const containerDiv = ref()
const footerRef = ref()
const headerRef = ref()

const height = ref<number | string>('auto')
onMounted(() => {
  const containerheight = window.innerHeight
  const footerheight = footerRef.value.getBoundingClientRect().height
  const headerheight = headerRef.value.ref.getBoundingClientRect().height

  height.value = containerheight - footerheight - headerheight
})
</script>

<template>
  <div ref="containerDiv">
    <Header ref="headerRef" label="Contact Admin" />
    <div class="flex grow flex-basis-1/1 flex-col justify-center">
      <Spinner v-if="isLoading" class="grow" />
      <div ref="msgContainer" class="my-lg flex flex-col gap-4 overflow-auto pb-4xl" :style="{ height: `${height}px` }">
        <ChatMessage v-for="msg in msgs" :key="msg.id" :msg="msg" :photo-url="msg.sender === 'admin' ? adminImageUrl : currentUser?.photoURL!" />
      </div>
      <!-- Chat Footer -->
      <div ref="footerRef" class="absolute bottom-0 w-full">
        <div class="relative flex">
          <button type="button" class="absolute right-2 top-1/2 my-auto flex inline-flex items-center items-center justify-center rounded-lg bg-blue-500 p-3 text-white transition duration-500 ease-in-out -translate-y-1/2 hover:bg-blue-400 focus:outline-none" @click="sendMessage()" @keyup.enter="sendMessage()">
            <span class="font-bold">Send</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="ml-1 h-6 w-6 rotate-90 transform">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>

          <textarea
            v-model="text" type="textarea" placeholder="Write your message!" class="h-max w-full rounded-md bg-gray-200 py-3 pl-xs pr-28 text-gray-600 dark:bg-gray-800 focus:outline-none !dark:text-gray-200 placeholder-gray-400 dark-placeholder-gray-300 focus:placeholder-gray-500 dark:focus:placeholder-gray-100"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
   dontShowFooter: true
 </route>
