import CustomPlugins from './customPlugins'

const path = require('path')
const bodyParser = require('body-parser')
const pick = require('lodash/pick')
const serviceConfig = require('./config/' + process.env.CONFIG_LEVEL + '.config.js').default
const FRONT_VISIBILITY_CONFIG = pick(serviceConfig, Object.keys(serviceConfig))
const webpack = require('webpack')


const serverScripts = [
  {
    src: "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=a37v123i2m"
  },
  { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' },
  {
    src:
      'https://polyfill.io/v3/polyfill.min.js?features=es6%2CArray.from%2CArray.prototype.forEach%2Ces7%2CArray.prototype.includes%2CArray.prototype.indexOf%2CArray.prototype.map%2CArray.prototype.reduce%2CEventSource%2CNodeList.prototype.forEach%2CString.prototype.includes%2CEvent%2CObject.assign%2Event',
  },
]

// polyfills that support IE11
const links = [
  // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Roboto:wght@400;500;700&display=swap',
  },
]

const dir = {
  pages: process.env.NUXT_PAGES || 'pages',
  layouts: process.env.NUXT_LAYOUTS || 'layouts',
}

const plugins = [
  // {
  //   src: path.resolve(__dirname, './_core/plugin/connectBuilderHelper'),
  //   ssr: true,
  // },
  {
    src: path.resolve(__dirname, './_core/plugin/RestClientFeatures'),
    ssr: true,
  },
  {
    src: path.resolve(__dirname, './_core/plugin/initBuilderSystemFront'),
    ssr: false,
  },
  { src: path.resolve(__dirname, './_core/plugin/initSSR'), ssr: true },
  { src: path.resolve(__dirname, './_core/plugin/init'), ssr: false },
  { src: path.resolve(__dirname, './_core/plugin/navigation'), ssr: true },
  { src: path.resolve(__dirname, './_core/plugin/utils'), ssr: true },
  ...CustomPlugins,
]

if (process.env.COLLECTION) {
  plugins.push({
    src: path.resolve(__dirname, process.env.COLLECTION),
    ssr: false,
  })
}

const config = {
  buildModules: [
    '@nuxtjs/moment',
    '@nuxtjs/device',
    '@nuxtjs/vuetify',
  ],
  vuetify: {
    defaultAssets: false,
  },
  serverMiddleware: [
    bodyParser.urlencoded({ extended: false }),
    bodyParser.json(),
  ],
  srcDir: 'src/',
  dir,
  buildDir: process.env.NUXT_BUILD || '.nuxt/',
  plugins,

  env: {
    NODE_ENV: process.env.NODE_ENV || 'PRODUCTION',
    CONFIG_LEVEL: process.env.CONFIG_LEVEL || 'prd',
    FRONT_VISIBILITY_CONFIG: JSON.stringify(FRONT_VISIBILITY_CONFIG) || '{}',
  },

  head: {
    title: 'zin',
    htmlAttrs: {
      lang: 'ko',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: links,
    script: serverScripts,
  },

  /*
   ** Customize the progress bar color
   */

  build: {
    terser: {
      terserOptions: {
        compress: {
          drop_console: process.env.CONFIG_LEVEL === 'prd' ? true : false,
        },
      },
    },
    standalone: true,
    babel: {
      babelrc: true,
      presets: ['@nuxt/babel-preset-app'],
    },

    splitChunks: {
      layouts: true,
    },
    // analyze: true,

    typeCheck: false,
    // 빌드할 때 번들 최적화를 비쥬얼라이즈. 분석 용도로만 사용하시오.
    // analyze: {
    //   analyzerMode: 'static',
    //   logLevel: 'info', // info is default
    // },

    /*
     * vendor migration to webpack4. referred https://stackoverflow.com/questions/48985780/webpack-4-create-vendor-chunk/49005059
     * */

    optimization: {
      runtimeChunk: true,
      // minimize: true,	// false
      // webpack4 splitChunks. https://webpack.js.org/plugins/split-chunks-plugin/
      splitChunks: {
        chunks: 'all', // all|async|initial
        maxInitialRequests: Infinity, // entryPoint 에 대한 최대 요청 수.
        minSize: 0, // 생성될 청크의 최소 사이즈(byte)
        // minChunks: 0,						// 스플리팅 전에 청크가 공유해야되는 모듈의 수
        cacheGroups: {
          // false 로 설정하면 사용하지 않음. splitChunks.* 에 설정된 내용을 덮어씀. test, priority, reuseExistingChunk 속성은 cacheGroup 으로 설정한 경우에만 적용 가능함
          vendor: {
            test: /[\\/]node_modules[\\/](moment|lodash|axios|babel-polyfill|js-cookie|jwt-decode)[\\/]/,
            name: 'utilityVendor',
            // enforce: true,			// splitChunks.* 에 설정된 일부 속성(minSize, maxSize, minChunks, maxAsyncRequests, maxInitialRequests) 무시
          },
          styles: {
            name: 'styles',
            test: /\.(css|vue)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },

    extractCSS: true,
    /*
     * Run ESLint on save
     */
    extend(config, { isDev, isClient, loaders: { vue } }) {
      const {
        resolve, module: { rules },
      } = config
      const { alias } = resolve;

      if (isDev) {
        config.devtool = isClient ? 'source-map' : 'inline-source-map'
      }

      rules.push(
        {
          test: /\.scss$/,
          loader: 'sass-loader',
        },
      )
    },
    plugins: [

      // ignore locales of moment module
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    transpile: [
      'nuxt-vuex-localstorage',
      'swiper',
      'dom7',
      'vue-masonry',
      'detail-scroll',
      'dialog',
      'fixElem',
      'focusEvent',
      'masonry-list-set',
      'min-height',
      'topBtn',
    ],
  },

  css: [
    '@/assets/css/base.css',
    '@/assets/css/grid.css',
    '@/assets/css/layout.css',
    '@/assets/css/ui.css',
    '@/assets/css/styling.css',
    '@/assets/css/detail.css',
    '@/assets/css/style.css',
    '@/assets/css/store.css',
    '@/assets/css/zin.css',
  ],

  modules: [
    'nuxt-vuex-localstorage',
    '@nuxtjs/axios',
    ['nuxt-lazy-load', {
      directiveOnly: true,
      loadingClass: 'is-lazy-loading',
      loadedClass: 'is-lazy-loaded',
    }],
  ],
  moment: {
    defaultTimezone: 'Asia/Seoul',
    locales: ['ko'],
  },
  router: {
    middleware: ['auth', 'dynamicRouteSupport', 'storeCategory', 'productCategory'],

    extendRoutes(routes, resolve) {
      // for (let i = 0; i < routes.length; i++) {
      //   let route = routes[i]

      //   route = {
      //     ...route,
      //   }

      //   if (serviceConfig.dynamicSiteRouting) {
      //     route.path = route.path.replace(/^\/\@auto/, '/:site')
      //   } else {
      //     route.path = route.path.replace(/^\/\@auto/, '')
      //   }

      //   routes[i] = route
      // }

      routes.push({
        name: 'content',
        path: '/__common/contentEditable',
        component: resolve(
          __dirname,
          '_core/mutableRender/contentsEditable.js',
        ),
      })

      // new Array(10).fill('dynamicRoutes').forEach((_, i) => {
      //   routes.push({
      //     name: `$DynamicPage.D${ i + 1}`,
      //     path: new Array(i + 1).fill('dynamicPath').map((_, i) => `/: depth${ i + 1 } `).join(''),
      //     component: resolve(__dirname, '_core/mutableRender/dynamicPage.js'),
      //   })
      // })
    },
  },
}

export default config
