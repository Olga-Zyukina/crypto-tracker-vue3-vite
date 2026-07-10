import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(),vueDevTools()],
  base: '/crypto-tracker-vue3-vite/dist/',
  
  // createHtmlPlugin({})
})


