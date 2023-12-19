<script setup>
import { useDark, useToggle } from '@vueuse/core';
import 'vue3-toastify/dist/index.css';

const isDark = useDark({
  disableTransition: false,
})
const toggleDark = useToggle(isDark)

const pushAccess = usePermission('push')

const showPushNotificationsModal = useStorage('showPushNotificationsModal', false)

onMounted(() => {
  if (showPushNotificationsModal.value || Notification.permission === 'granted')
    return
  setTimeout(() => {
    showPushNotificationsModal.value = true
  }, 500)
})

function promptPushNotification() {
  showPushNotificationsModal.value = false
  Notification.requestPermission().then((permission) => { console.log('permiss', permission) })
}
</script>

<template>
  <AskForPushNotifications
    v-if="showPushNotificationsModal" @proceed="promptPushNotification" @cancel="
      showPushNotificationsModal = false

    "
  />
  <RouterView />
</template>
