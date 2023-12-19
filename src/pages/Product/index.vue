<script setup lang="ts">
import { useProducts } from '../../store/global';

const { results, isLoading } = useProducts()

const router = useRouter()

function moveToProduct(id: string) {
  router.push(`/Product/${encodeURIComponent(id)}`)
}
</script>

<template>
  <div>
    <Header label="Products" />
    <div class="grid grid-cols-2 place-content-center gap-2 pa-sm">
      <Spinner v-if="isLoading" class="col-span-2 min-h-50vh" />
      <div
        v-for="(item) in results"
        :key="item.id"
        class="cursor-pointer rounded bg-white pa-xs shadow-lg"
        @click="moveToProduct(item.id)"
      >
        <div class="aspect-h-1 aspect-w-1 lg:aspect-none h-full w-full flex flex-col overflow-hidden rounded-md lg:h-80 group-hover:opacity-75">
          <img :src="item.picture" width="75" height="75" alt="Card Image" class="mx-auto h-full max-w-45 w-full object-contain object-center">
          <div class="mt-4 mt-auto flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{ item.subtitle }}
              </p>
            </div>
            <p class="text-sm text-gray-900 font-medium">
              {{ item.price }}&#163;
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
