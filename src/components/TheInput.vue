<script setup lang="ts">
defineProps<{
  label: string
}>()

const modelValue = defineModel()
</script>

<template>
  <div class="!bg-secondary relative my-1.5 rounded-lg bg-inherit p-0">
    <label
      class="absolute start-2.5 top-4 z-10 origin-[0] scale-75 transform text-sm text-gray-500 transition-250 duration-300 dark:text-gray-400"
      :class="{ '-translate-y-3 !start-1.7': modelValue }"
    >{{ label }}</label>

    <input
      v-model="modelValue"
      v-bind="$attrs"
      placeholder=" "
      class="peer block w-full appearance-none border-1 border-gray-300 rounded-lg bg-transparent px-2.5 pb-3.5 pt-5 text-sm text-gray-900 dark:border-gray-600 focus:border-blue-600 dark-text-white focus:outline-none focus:ring-0 dark:focus:border-blue-500"
    >

    <div class="absolute start-1 inset-y-0 flex items-center ps-3.5">
      <slot name="left-icon" />
    </div>
    <div class="absolute end-1 inset-y-0 flex items-center ps-3.5">
      <slot name="right-icon" />
    </div>
  </div>
</template>
