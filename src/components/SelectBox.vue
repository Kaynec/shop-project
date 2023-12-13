<script lang="ts" setup>
import {
Listbox,
ListboxButton,
ListboxOption,
ListboxOptions,
} from '@headlessui/vue';
import type { ModelType } from '../types';

const props = defineProps<{
  items: ModelType[]
}>()

defineEmits(['update:model-value'])

const selectedItem = ref(props.items[0])
</script>

<template>
  <Listbox v-model="selectedItem" as="div" class="relative min-h-70 rounded-lg" @update:model-value="$emit('update:model-value', selectedItem)">
    <h5 class="mt-4">
      select order address
    </h5>
    <div class="relative mt-1">
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 sm:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/75 focus-visible:ring-offset-orange-300"
      >
        <span class="block truncate">{{ selectedItem.name }}</span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <div
            class="i-carbon:chevron-sort"
          />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 !z-99 sm:text-sm focus:outline-none"
        >
          <ListboxOption
            v-for="item in items"
            v-slot="{ active, selected }"
            :key="item.name"
            :value="item"
            as="div"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4" :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
              ]"
            >
              <span
                class="block truncate" :class="[
                  selected ? 'font-medium' : 'font-normal',
                ]"
              >{{ item.name }}</span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
              >
                <div class="i-carbon:checkmark" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
