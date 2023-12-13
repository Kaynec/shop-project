<script setup lang="ts">
import { useProducts, useUserState } from '../store/global';

defineOptions({
  name: 'IndexPage',
})

const { results, isLoading } = useProducts()

const state = useUserState()
</script>

<template>
  <div>
    <Header label="Products" />
    <div class="grid grid-cols-2 place-content-center gap-2 pa-sm">
      <Spinner v-if="isLoading" class="col-span-2 min-h-50vh" />
      <div v-for="item in results" :key="item.id" class="rounded bg-white pa-xs shadow-lg">
        <div class="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24">
          <div class="grid grid-cols-1 mt-6 gap-x-6 gap-y-10 lg:grid-cols-4 sm:grid-cols-2 xl:gap-x-8">
            <div class="group relative">
              <div class="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 lg:h-80 group-hover:opacity-75">
                <img :src="item.picture" width="75" height="75" alt="Card Image" class="h-full w-full b-1 b-gray-1 b-solid object-cover object-center lg:h-full lg:w-full">
              </div>
              <div class="mt-4 flex justify-between">
                <div>
                  <h3 class="text-sm text-gray-700">
                    <RouterLink :to="`/Product/${item.id}`">
                      <span aria-hidden="true" class="absolute inset-0" />
                      {{ item.title }}
                    </RouterLink>
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
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
