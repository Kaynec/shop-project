<script setup lang="ts">
import type { Firestore } from 'firebase/firestore'
import { Timestamp, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import { toast } from 'vue3-toastify'
import { useUserState } from '../../store/global'
import type { DBAddress } from '../../types'

interface Props {
  address?: DBAddress | null
}

const props = defineProps<Props>()

const emit = defineEmits(['closeModal'])

const address = toRef(props, 'address')

const DB = inject('DB') as Firestore
const userId = useUserState().currentUser.value.uid

function getUpdatedCoordinatesAndAddress(data: {
  coordinate: number[]
  displayName: string
}) {
  // Safe To Assume This is Okay Because This Functions is Called after Data is ALready there
  address.value!.coordinate = data.coordinate
  address.value!.displayName = data.displayName
}

async function createOrUpdateAddress() {
  // Display name not fetched yet or empty
  if (!address.value?.displayName)
    return
  if (!address.value?.coordinate[0] || !address.value?.coordinate[0]) {
    toast('Please select a location from the map', {
      type: 'error',
    })
  }

  const date = new Date()

  const addressData: Record<string, unknown> = {
    displayName: address.value.displayName,
    description: address.value.description,
    coordinate: address.value.coordinate,
    ownerId: userId,
    updatedAt: address.value.id ? Timestamp.fromDate(date) : '',
  }

  if (addressData.ownerId)
    addressData.createdAt = Timestamp.fromDate(date)

  setDoc(doc(DB, 'addres', address.value.id || uuid()), addressData).then(() => {
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

async function deleteAddress() {
  // address.value!.id this is okay because we don't even show the button if there is no value
  deleteDoc(doc(DB, 'addres', address.value!.id)).then(() => {
    toast('address deleted succesfully', {
      autoClose: 3000,
      type: 'success',
      position: 'bottom-center',
    })
  })
    .catch((err) => {
      toast(err.message, {
        autoClose: 3000,
        type: 'error',
        position: 'bottom-center',
      })
    }).finally(() => emit('closeModal'))
}
</script>

<template>
  <section>
    <!-- {{ address.description }} -->
    <!-- {{ address.displayName }} -->
    <Modal v-if="address" @close-modal="$emit('closeModal')">
      <template #title>
        {{ address.id ? 'Edit' : 'Create' }} Address
      </template>

      <template #default>
        <TheInput v-model="address.description" type="text" label="Description of this address" />
        <Map :coordinate="address.coordinate" @coordinate-updated="getUpdatedCoordinatesAndAddress" />
      </template>

      <template #actions>
        <PrimaryButton class="flex-1 text-xs" @click="createOrUpdateAddress">
          {{ address.id ? 'Update' : 'Create' }}
        </PrimaryButton>
        <!--  -->
        <OutlinedButton v-if="address.id" class="flex-1 text-xs" @click="deleteAddress">
          Delete
        </OutlinedButton>
      </template>
    </Modal>
  </section>
</template>

<style scoped>

</style>
