//
// @ts-expect-error i have no clue why this isn't working , but it really doesn't matter
import { setupLayouts } from 'virtual:generated-layouts'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { routes as pageRoutes } from 'vue-router/auto/routes'

import OpenLayersMap from 'vue3-openlayers'
import firebasePlugin, { setUserToStore } from './lib/firebase'

import 'vue3-openlayers/styles.css'

// vue3-openlayers version < 1.0.0-*

import '@unocss/reset/tailwind.css'
import App from './App.vue'

import 'uno.css'
import { useUserState } from './store/global'
import './styles/main.scss'

const routes = setupLayouts(pageRoutes)
const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const state = useUserState()
  const isAuthenticated = state.isAuthenticated

  if (isAuthenticated.value) {
    next()
  }

  else {
    if (to.meta.requiresNotAuth)
      next()

    else return next('/')
  }
})

app.use(firebasePlugin).use(router)
//
app.use(OpenLayersMap /* options */)
// Add a Event Listener For FireBase Auth Session
setUserToStore()

app.mount('#app')
