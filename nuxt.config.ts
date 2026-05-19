import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const stylesDir = resolve(__dirname, 'app/assets/styles')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: { compatibilityVersion: 4 },

  srcDir: 'app/',

  css: ['~/assets/styles/main.scss'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${stylesDir}/_variables"; @import "${stylesDir}/_mixins";`
        }
      }
    }
  },

  components: [
    {
      path: '~/shared/ui',
      pathPrefix: false,
      global: false,
    }
  ],

  imports: {
    dirs: [], // no auto-scan of project dirs; use explicit imports within FSD layers
  },

  modules: [
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],

  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
      { code: 'ru', language: 'ru-RU', file: 'ru.json', name: 'Русский' },
      { code: 'uz', language: 'uz-UZ', file: 'uz.json', name: "O'zbek" },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    restructureDir: false,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  alias: {
    '#shared': fileURLToPath(new URL('./app/shared', import.meta.url)),
    '#widgets': fileURLToPath(new URL('./app/widgets', import.meta.url)),
    '#features': fileURLToPath(new URL('./app/features', import.meta.url)),
    '#views': fileURLToPath(new URL('./app/views', import.meta.url)),
  },
})
