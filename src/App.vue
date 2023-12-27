<script setup>
import 'vue3-toastify/dist/index.css';

const showPushNotificationsModal = useStorage('showPushNotificationsModal', false)

const db = inject('DB')

async function promptPushNotification() {
  showPushNotificationsModal.value = false
  await Notification.requestPermission()
  //
  // Only Init When Needed
  if (Notification.permission === 'granted')
    await initMessageing(db)
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
</script>

<template>
  <AskForPushNotifications
    v-if="showPushNotificationsModal" @proceed="promptPushNotification" @cancel="
      showPushNotificationsModal = false

    "
  />
  <RouterView />
</template>
