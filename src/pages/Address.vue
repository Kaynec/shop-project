<script setup lang="ts">
import { useAddres } from '../store/global';
import type { DBAddress } from '../types';

const blankEvent = {
  ownerId: '',
  id: '',
  description: '',
  displayName: '',
  coordinate: [],
}

const { results: address, isLoading } = useAddres()
const currentAddress = ref<DBAddress | null>(null)

function setTOItem(data: any) {
  currentAddress.value = data
}
</script>

<template>
  <div class="flex flex-col">
    <!-- This is The Handler For Modal -->
    <ModifyAddress v-if="currentAddress" :address="currentAddress" @close-modal="currentAddress = null" />
    <!-- header -->
    <Header label="Address" />

    <div class="z-9 mt-2 flex grow flex-col gap-4 overflow-auto px-4 container">
      <Spinner v-if="isLoading" />
      <DetailCard v-for="(item, index) in address" :key="index" @click="setTOItem(item)">
        <div class="flex flex-col gap-2">
          <span>{{ item.description }}</span>
          <span>{{ item.displayName }}</span>
        </div>
      </DetailCard>
      <div pa-sm>
        <PrimaryButton @click="currentAddress = blankEvent ">
          Add Address
        </PrimaryButton>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
