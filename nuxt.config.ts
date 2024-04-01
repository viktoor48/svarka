export default defineNuxtConfig({
  ssr: false,
  css: [
    'vue-final-modal/style.css',
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
  ],
  vite: {
    server: {
      fs: {
        strict: false
      }
    },
  },
})