export default defineNuxtConfig({
  css: [
    '@/assets/main.css'
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  vite: {
    server: {
      fs: {
        strict: false
      }
    }
  },
})