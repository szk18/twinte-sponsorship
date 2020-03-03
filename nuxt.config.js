
export default {
  mode: 'spa',
  server: {
    port: 8000 // デフォルト: 3000
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Twin:te スポンサー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Twin:te 協賛ページ'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Twin:te Sponsorship'
      },
      { hid: 'og:type', property: 'og:type', content: 'summary_large_image' },
      { hid: 'og:url', property: 'og:url', content: 'https://sponsorship.twinte.net' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Twin:te スポンサー'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://sponsorship.twinte.net/sponsor-ogp.png'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Twin:te 協賛ページ'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `https://sponsorship.twinte.net/sponsor-ogp.png`
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@te_twin' }
    ],
    script: [
      {
        src: 'https://js.stripe.com/v3/'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/style.scss' // buefyのベース定義のファイルを読み込む
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ '~/plugins/dayjs'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    ['@nuxtjs/google-analytics', {
      id: 'UA-153429703-3'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'vue-sweetalert2/nuxt'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'https://api.twinte.net/v1/',
    credentials: 'true'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
