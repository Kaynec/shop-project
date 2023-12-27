<template>
  <footer class="sticky bottom-0 z-10 max-h-130px min-h-[4.5rem] w-full flex flex items-center justify-between bg-accent px-lg !mt-auto bg-secondary">
    <router-link
      class="text-dark dark:text-white"
      exact-active-class="bg-primary !text-white rounded-full"
      :to="{
        name: '/Product/',
      }"
    >
      <div class="h-12.5 w-12.5 flex items-center justify-center">
        <div class="i-carbon-product text-1.5rem text-inherit" />
      </div>
    </router-link>
    <router-link
      class="text-dark dark:text-white"
      exact-active-class="bg-primary !text-white rounded-full"
      :to="{
        name: '/Address',
      }"
    >
      <div class="h-12.5 w-12.5 flex items-center justify-center">
        <div class="i-carbon-location text-1.5rem text-inherit" />
      </div>
    </router-link>

    <router-link
      class="text-dark dark:text-white"
      exact-active-class="bg-primary !text-white rounded-full"
      :to="{
        name: '/HomePage',
      }"
    >
      <div class="h-12.5 w-12.5 flex items-center justify-center">
        <div class="i-carbon-home text-1.5rem text-inherit" />
      </div>
    </router-link>
    <router-link
      class="text-dark dark:text-white"
      exact-active-class="bg-primary !text-white rounded-full"
      :to="{
        name: '/Orders',
      }"
    >
      <div class="h-12.5 w-12.5 flex items-center justify-center">
        <div class="i-carbon-shopping-cart text-1.5rem text-inherit" />
      </div>
    </router-link>

    <router-link
      class="text-dark dark:text-white"
      exact-active-class="bg-primary !text-white rounded-full"
      :to="{
        name: '/Profile',
      }"
    >
      <div class="h-12.5 w-12.5 flex items-center justify-center">
        <div class="i-carbon-user text-1.5rem text-inherit" />
      </div>
    </router-link>
  </footer>
</template>
