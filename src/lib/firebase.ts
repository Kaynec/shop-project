// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getMessaging, getToken } from 'firebase/messaging'
import { getStorage } from 'firebase/storage'
import type { App as Application } from 'vue'
import { useUserState } from '../store/global'

export const firebaseConfig = {
  apiKey: 'AIzaSyA26bX7NSqS2lNLJYGd12Mx_BCsPiF1ZxA',
  authDomain: 'shop-c7760.firebaseapp.com',
  databaseURL: 'https://shop-c7760-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'shop-c7760',
  storageBucket: 'shop-c7760.appspot.com',
  messagingSenderId: '870784967057',
  appId: '1:870784967057:web:8d25a8dcae588237847a30',
  measurementId: 'G-EJVC2Z7X8D',
}

export function setUserToStore() {
  const auth = getAuth()

  auth.onAuthStateChanged((user) => {
    const state = useUserState()
    state.currentUser.value = user
  })
}

// plugins/i18n.js
// Initialize Firebase
let app: FirebaseApp

function initializeAppSetup() {
  if (app)
    return app
  else app = initializeApp(firebaseConfig)
  return app
}
initializeAppSetup()
// initializeApp(firebaseConfig)
export default {
  install: async (vueApp: Application) => {
    const storage = getStorage()
    vueApp.provide('storage', storage)
    const db = getFirestore()
    vueApp.provide('DB', db)

    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(app)
    await navigator.serviceWorker.register('/firebase-messaging-sw.js')
    getToken(messaging, { vapidKey: import.meta.env.VITE_APP_FIREBASE_MESSAGE_TOKEN }).then((res) => {
      console.log(res)
    })
    // vueApp.provide('Messaging', messaging)
  },
}
