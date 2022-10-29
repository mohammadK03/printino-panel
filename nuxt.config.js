import colors from 'vuetify/es5/util/colors'
const fa = require('vuetify/es5/locale/fa.js').default;

export default {
  ssr:false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {

    title: 'سامانه مدیریت پرینتینو',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/fonts.css',
    '~/assets/global.css',
    '~/assets/icon.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/otp.js', ssr: false },
    { src: '~/plugins/upload.js', ssr: false },
    { src: "~/plugins/vue-swiper.js", ssr: false },
    { src: "~/plugins/utils.js" },
    { src: "~/plugins/datetime.js", ssr: false },
    { src: "~/plugins/directives.js", ssr: false },
  ],
  izitoast: {
    position: 'bottomRight',
    transitionIn: 'bounceInLeft',
    transitionOut: 'fadeOutRight',
  },
  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,
  components: {
    dirs: [
      '~/components',


      {
        path: '~/components/gallery/',
        prefix: 'image'
      },
      {
        path: '~/components/product/',
        prefix: 'product'
      },
      {
        path: '~/components/product/',
        prefix: 'attribute'
      },

      {
        path: '~/components/attributes_overview/',
        prefix: 'product'
      },

      {
        path: '~/components/address/',
        prefix: 'address'
      },

    ]
  },
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-izitoast',
    '@nuxtjs/axios'
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.red.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: "#333",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    rtl: true,
    icons: true,
    lang: {
      locales: { fa },
      current: 'fa',
    },
    defaultAssets: false,
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    publicPath: "nuxt-adminpanel"
  },
  buildDir: "nuxt-adminpanel",
  server: {
    host: "0.0.0.0",
    port: "3000"
  }
}
