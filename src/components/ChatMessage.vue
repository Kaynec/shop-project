<script setup lang="ts">
import { useUserState } from './../store/global';
import type { Message } from './../types';

defineProps<{
  msg: Message
  photoUrl: string
}>()
const state = useUserState()

const currentUser = state.currentUser
</script>

<template>
  <div class="flex items-start gap-2.5 px-2">
    <div class="flex grow items-center gap-2.5" :class="{ 'flex-row-reverse': msg.sender === 'admin' }">
      <img class="h-8 w-8 rounded-full" :src="photoUrl" alt="Jese image">
      <div
        class="max-w-[320px] w-full flex flex-col border-gray-200 rounded-e-xl rounded-es-xl bg-slate-100 p-4 leading-1.5 shadow-lg dark:bg-slate-500"
        :class="{ '!bg-gray-200 !dark:bg-gray-800': msg.sender === 'admin' }"
      >
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm text-gray-900 font-semibold dark:text-white">{{ msg.sender === 'admin' ? 'Admin' : currentUser.displayName }}</span>
          <span v-if="msg.createdAt" class="text-sm text-gray-500 font-normal dark:text-gray-400">{{ new Date(msg.createdAt.toDate()).toLocaleDateString('en-En', {
            hour: '2-digit',
            weekday: 'long',
            day: 'numeric',
            minute: '2-digit',
          }) }}</span>
        </div>
        <p class="py-2.5 text-sm text-gray-900 font-normal dark:text-white">
          {{ msg.msg }}
        </p>
      </div>
      <!-- <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex items-center self-center rounded-lg bg-white p-2 text-center text-sm text-gray-900 font-medium dark:bg-gray-900 hover:bg-gray-100 dark:text-white focus:outline-none focus:ring-4 focus:ring-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
        <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button> -->
      <!-- <div id="dropdownDots" class="z-10 hidden w-40 rounded-lg bg-white shadow divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
          </li>
        </ul>
      </div> -->
    </div>
  </div>
</template>
