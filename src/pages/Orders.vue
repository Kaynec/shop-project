<script setup lang="ts">
import type { Firestore } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'vue3-toastify';
import { useOrders } from '../store/global';

const { results: orders, isLoading } = useOrders()

const currentOrderId = ref('')

const showCancelDialog = ref(false)

const DB = inject('DB') as Firestore
async function deleteOrder(id: string) {
  deleteDoc(doc(DB, 'order', id)).then(() => {
    toast('order deleted succesfully', {
      autoClose: 3000,
      type: 'success',
      position: 'bottom-center',
    })
    orders.value = orders.value.filter(el => el.id !== currentOrderId.value)
  })
    .catch((err) => {
      toast(err.message, {
        autoClose: 3000,
        type: 'error',
        position: 'bottom-center',
      })
    }).finally(() => currentOrderId.value = '')
}

function onCancel() {
  showCancelDialog.value = false
  currentOrderId.value = ''
}

function onOkay() {
  showCancelDialog.value = false
  deleteOrder(currentOrderId.value)
}
</script>

<template>
  <div class="flex flex-col">
    <!-- This is The Handler For Modal -->
    <CancelOrder v-if="showCancelDialog" v-model="showCancelDialog" @proceed="onOkay" @cancel="onCancel" />
    <!-- header -->
    <Header label="Orders" />

    <div class="z-9 mt-2 flex grow flex-col gap-4 overflow-auto px-4 container">
      <Spinner v-if="isLoading" />

      <div
        v-for="(item, index) in orders" :key="index"
        class="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
      >
        <a href="#!">
          <img
            class="mx-auto max-h-220px w-full border-b-1 border-b-gray-3 rounded-t-lg object-cover"
            :src="item.product.picture"
            alt="picture of product"
          >
        </a>
        <div class="p-6">
          <h5
            class="mb-2 text-xl text-neutral-800 font-medium leading-tight dark:text-neutral-50"
          >
            {{ item.product.title }}
          </h5>

          <div class="my-4 flex justify-between">
            <p class="text-base text-neutral-600 dark:text-neutral-200">
              Item price:{{ item.product.price }}&#163;
            </p><p class="text-base text-orange-500">
              Total price:{{ item.product.price * item.quantity }}&#163;
            </p>
          </div>

          <p class="mb-6 text-base text-neutral-600 dark:text-neutral-200">
            {{ item.product.description }}
          </p>

          <div class="grid mb-3 mt-6 items-center text-base text-neutral-600 dark:text-neutral-200">
            <div class="i-carbon-location h-6 w-6 bg-primary" />
            <p>
              {{ item.address.displayName }}
            </p>
          </div>

          <button
            type="button"
            class="hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs text-white font-medium leading-normal uppercase shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
            @click="() => {
              showCancelDialog = !showCancelDialog
              currentOrderId = item.id
            }"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
