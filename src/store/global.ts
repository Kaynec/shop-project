// store.js
import { createGlobalState, useStorage } from '@vueuse/core'
import type { User } from 'firebase/auth'

import type { DocumentReference, Firestore } from 'firebase/firestore'
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import type { DBAddress, DBOrder, DBProduct } from '../types'

export const useUserState = createGlobalState(
  () => {
    const currentUser = useStorage<User>('currentUser', {} as User)
    return {
      currentUser,
      isAuthenticated: computed(() => !!currentUser.value && !!currentUser.value?.uid),
    }
  },
)

export const useLoader = createGlobalState(
  () => {
    const value = useStorage('loading', false)
    return {
      getValue: () => value.value,
      setValue: (val: boolean) => value.value = val,
    }
  },
)

export const useAddres = createGlobalState(
  () => {
    const results = ref<DBAddress[]>([])
    const DB = inject('DB') as Firestore
    const userId = useUserState().currentUser.value.uid

    const q = query(collection(DB, 'addres'), where('ownerId', '==', userId))

    const isLoading = ref(true)

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      isLoading.value = false
      results.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DBAddress[]
    })

    // To stop listening to updates, call the unsubscribe function

    onBeforeUnmount(unsubscribe)

    return {
      results,
      isLoading,
    }
  },
)

export const useOrders = createGlobalState(
  () => {
    const results = ref<DBOrder[]>([])
    const DB = inject('DB') as Firestore
    const userId = useUserState().currentUser.value.uid

    const q = query(collection(DB, 'order'), where('ownerId', '==', userId), where('statusDone', '==', false))

    const isLoading = ref(true)

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      isLoading.value = false

      for (const doc of querySnapshot.docs) {
        const data = doc.data()
        results.value.push({
          ...data,
          address: (await getDoc(data.address)).data(),
          product: (await getDoc(data.product)).data(),
          id: doc.id,
        } as DBOrder)
      }
    })

    // To stop listening to updates, call the unsubscribe function

    onBeforeUnmount(unsubscribe)

    return {
      results,
      isLoading,
    }
  },
)

export const useProducts = createGlobalState(
  () => {
    const results = ref<DBProduct[]>([])
    const DB = inject('DB') as Firestore

    const q = query(collection(DB, 'product'))
    const isLoading = ref(true)

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      isLoading.value = false
      results.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as DBProduct[]
    })

    // To stop listening to updates, call the unsubscribe function

    onBeforeUnmount(unsubscribe)

    return {
      results,
      isLoading,
    }
  },
)

export const useSingleProduct = createGlobalState(
  (id: string) => {
    const result = ref<DBProduct>()
    const fullResult = ref<DocumentReference>()
    const DB = inject('DB') as Firestore

    const isLoading = ref(true)

    getDoc(doc(DB, 'product', id)).then((doc) => {
      isLoading.value = false
      result.value = { ...doc.data() as DBProduct, id }
      fullResult.value = doc.ref
    })

    // To stop listening to updates, call the unsubscribe function

    return {
      result,
      isLoading,
      fullResult,
    }
  },
)

export const useSingleAddress = createGlobalState(
  (id: string) => {
    const result = ref<DBAddress>()
    const fullResult = ref<DocumentReference>()
    const DB = inject('DB') as Firestore

    const isLoading = ref(true)

    getDoc(doc(DB, 'addres', id)).then((doc) => {
      isLoading.value = false
      result.value = { ...doc.data() as DBAddress, id }
      fullResult.value = doc.ref
    })

    // To stop listening to updates, call the unsubscribe function

    return {
      result,
      isLoading,
      fullResult,
    }
  },
)
