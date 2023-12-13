<script setup lang="ts">
import type { Firestore } from 'firebase/firestore'
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { toast } from 'vue3-toastify'
import { useAddres, useUserState } from '../../store/global'
import type { DBProduct, ModelType } from '../../types'

interface Props {
  product: DBProduct
}
const props = defineProps<Props>()
const emit = defineEmits(['closeModal'])
const DB = inject('DB') as Firestore
const userId = useUserState().currentUser.value.uid

const order = ref(
  {
    quantity: 1,
    ownerId: userId,
    createdAt: '' as string | Timestamp,
    // updatedAt: '' as string | Timestamp,
    product: props.product,
    address: '',
    statusDone: false,
  },
)
const selectedAddress = ref<ModelType>()

async function addToBasket() {
  // Display name not fetched yet or empty
  if (!order.value.quantity) {
    return toast('quantity of order can\'t be less than 1', {
      type: 'error',
    })
  }

  if (!selectedAddress.value) {
    return toast('please select an address', {
      type: 'error',
    })
  }

  const date = new Date()

  // if (order.value.id)
  order.value.createdAt = Timestamp.fromDate(date)

  // order.value.product.id

  // selectedAddress.value.id

  const getAddressRef = (await getDoc(doc(DB, 'addres', selectedAddress.value.id)))
  const getProductRef = await getDoc(doc(DB, 'product', order.value.product.id))

  setDoc(doc(DB, 'order', uuid()), {
    ...order.value,
    product: getProductRef.ref,
    address: getAddressRef.ref,
  }).then(() => {
    toast('proccess was succesfull', {
      autoClose: 3000,
      type: 'success',
      position: 'bottom-center',
    })
  }).catch((err) => {
    toast(err.message, {
      autoClose: 3000,
      type: 'error',
      position: 'bottom-center',
    })
  }).finally(() => emit('closeModal'))
}

const { results: address, isLoading } = useAddres()

const addresses = computed(() => {
  return address.value.map(addres => ({
    id: addres.id,
    name: addres.displayName,
  }))
})
</script>

<template>
  <Modal @close-modal="$emit('closeModal')">
    <template #title>
      Add to basket
    </template>

    <template #default>
      <TheInput v-model="order.quantity" type="number" label="quanity of this order" />
      <SelectBox v-if="addresses.length" :key="addresses.length" v-model="selectedAddress" :items="addresses" />
    </template>

    <template #actions>
      <PrimaryButton class="flex-1 text-xs" @click="addToBasket">
        Add
      </PrimaryButton>
    </template>
  </Modal>
</template>

<style scoped>

</style>
