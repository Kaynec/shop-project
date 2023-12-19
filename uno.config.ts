import { presetFlowbite } from '@julr/unocss-preset-flowbite'

import {
defineConfig,
presetAttributify,
presetIcons,
presetUno,
presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    ['bg-secondary', 'bg-#EAF6FF dark:bg-gray-7'],
  ],
  theme: {
    colors: {
      primary: '#FC0B0D',
      accent: '#EAF6FF',
      paper: '#004B84',
      dark: '#000',
    },
  },

  presets: [
    presetUno(),
    presetAttributify(),
    presetFlowbite(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
