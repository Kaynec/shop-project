// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore'
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

// Initialize Firebase
let app: FirebaseApp

export function setUserToStore() {
  const auth = getAuth()

  auth.onAuthStateChanged((user) => {
    const state = useUserState()
    state.currentUser.value = user
  })
}

export async function firebaseMessagingSetup(db: Firestore) {
  const state = useUserState()

  // Initialize Firebase Cloud Messaging and get a reference to the service

  const messaging = getMessaging(app)

  getToken(messaging, { vapidKey: import.meta.env.VITE_APP_FIREBASE_MESSAGE_TOKEN }).then((token) => {
    setDoc(doc(db, `fcmTokens/${state.currentUser.value.uid}`), {
      timestamp: serverTimestamp(),
      token,
      user: state.currentUser.value.uid,
    })
  })

  return messaging
}

/**
 * If notification permission is granted and the user is authenticated, initialize messaging with the Firebase database reference.
 * This will set up push notifications for the authenticated user.
 */

export async function initMessageing(db: Firestore) {
  const state = useUserState()

  if (Notification.permission === 'granted' && state.isAuthenticated.value)
    firebaseMessagingSetup(db)
}

function initializeAppSetup() {
  if (app)
    return app
  else app = initializeApp(firebaseConfig)
  return app
}
initializeAppSetup()
export default {
  install: async (vueApp: Application) => {
    const storage = getStorage()
    vueApp.provide('storage', storage)
    const db = getFirestore()
    vueApp.provide('DB', db)
  },
}
