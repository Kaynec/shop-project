<script setup lang="ts">
import type { Firestore } from 'firebase/firestore/lite';
import 'vue3-toastify/dist/index.css';
import { initMessageing } from './lib/firebase';

const showPushNotificationsModal = useStorage('showPushNotificationsModal', false)

const DB = inject('DB') as Firestore

async function promptPushNotification() {
  /**
   * Prompts the user for push notification permission if it has not already been granted or denied.
   * Sets showPushNotificationsModal to false to close the prompt modal.
   * Requests notification permission from the browser and handles the response.
   * If permission is granted, initializes Firebase messaging using the provided DB instance.
   */
  showPushNotificationsModal.value = false
  const res = await Notification.requestPermission()
  if (res === 'granted')
    initMessageing(DB)
}
const route = useRoute()
function displayNotificationPrompt() {
  if (route.name === '/' || route.name === '/Login' || route.name === '/Register')
    return
  if (showPushNotificationsModal.value || Notification.permission === 'granted' || Notification.permission === 'denied')
    return
  setTimeout(() => {
    showPushNotificationsModal.value = true
  }, 2000)
}

onMounted(displayNotificationPrompt)

watch(() => route.fullPath, displayNotificationPrompt, {
  deep: true,
})

/**
 * Initializes messaging using the provided Firestore database instance.
 * This should be called early in the application startup to enable
 * push notifications and other messaging features.
 */
const db = inject('DB') as Firestore

initMessageing(db)
</script>

<template>
  <AskForPushNotifications
    v-if="showPushNotificationsModal" @proceed="promptPushNotification" @cancel="
      showPushNotificationsModal = false

    "
  />
  <RouterView />
</template>
