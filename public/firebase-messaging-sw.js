// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyA26bX7NSqS2lNLJYGd12Mx_BCsPiF1ZxA',
  authDomain: 'shop-c7760.firebaseapp.com',
  databaseURL: 'https://shop-c7760-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'shop-c7760',
  storageBucket: 'shop-c7760.appspot.com',
  messagingSenderId: '870784967057',
  appId: '1:870784967057:web:8d25a8dcae588237847a30',
  measurementId: 'G-EJVC2Z7X8D',
}
firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  globalThis.registration.showNotification(notificationTitle, notificationOptions)
})
