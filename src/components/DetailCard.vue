<template>
  <div class="flex items-center justify-between b-1 b-gray-1 rounded-lg b-solid bg-white pa-sm pb-4 shadow-xl dark:bg-gray-7">
    <span class="basis-90%">
      <slot />
    </span>
    <!-- angle left -->
    <slot name="right_side">
      <div class="i-carbon:chevron-right !text-xl" />
    </slot>
  </div>
</template>
