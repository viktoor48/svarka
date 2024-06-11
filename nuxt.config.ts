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
    'yandex-metrika-module-nuxt3',
    '@nuxtjs/google-fonts',
  ],
  yandexMetrika: {
    id: '97543801',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  },
  googleFonts: {
    families: {
      Inter: {
        wght: [400, 600, 700],
      },
      Unbounded: {
        wght: [400, 600, 700, 800],
      },
      Montserrat: {
        wght: [400, 500, 700],
      },
    },
  },
  vite: {
    server: {
      fs: {
        strict: false
      }
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://79.174.86.226'
    }
  }
})