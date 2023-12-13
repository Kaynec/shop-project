<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSingleProduct } from '../../store/global';

const router = useRouter()

const id = (router.currentRoute.value.params as { id: string }).id.toString()

const { result: product, isLoading } = useSingleProduct(id)

const showProductComponent = ref(false)

function toggleShowProduct() {
  showProductComponent.value = !showProductComponent.value
}
</script>

<template>
  <div>
    <!-- This is okay because we don't show the button that activates this before product is already fetched and fine -->
    <AddProductToOrder
      v-if="showProductComponent"
      :product="product!"
      @close-modal="showProductComponent = false"
    />
    <Header :label="product?.title ?? 'Product Page'" />
    <div class="pa-xs">
      <Spinner v-if="isLoading" class="col-span-2 min-h-50vh" />
      <div v-else-if="product" :key="product.id" class="rounded bg-white pa-xs shadow-lg">
        <div class="mx-auto max-w-2xl lg:max-w-7xl lg:px-8 sm:px-6 sm:py-24">
          <div class="group relative">
            <div class="grid w-full place-content-center overflow-hidden b-2 b-gray-1 rounded-md b-solid p-2 group-hover:opacity-75">
              <img :src="product.picture" width="75" height="75" alt="Card Image" class="aspect-[16/9] max-h-135 max-w-150 w-full object-cover object-center">
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.title }}
                </h3>
                <p class="mt-4 text-sm text-gray-500">
                  {{ product.description }}
                </p>
              </div>
              <p class="text-sm text-gray-900 font-medium">
                {{ product.price }}&#163;
              </p>
            </div>
          </div>
          <PrimaryButton type="button" class="mt-4" @click="toggleShowProduct">
            Add to basket
          </PrimaryButton>
        </div>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
layout: loggedIn
</route>
