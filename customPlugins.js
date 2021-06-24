const path = require('path')

export default [
  {
    src: path.resolve(__dirname, './src/plugins/nuxt-swiper-plugin.js'),
    ssr: false,
    mode: 'client',
  },
  {
    src: path.resolve(__dirname, './src/plugins/vuetify.js'),
    mode: 'client',
    ssr: false,
  },
  {
    src: path.resolve(__dirname, './src/plugins/jw-vue-paginate.js'),
  },
  {
    src: path.resolve(__dirname, './src/plugins/kakao-sdk.js'),
    mode: 'client',
  },
  {
    src: path.resolve(__dirname, './src/plugins/vuebar'),
    ssr: false,
  }, // 스크롤바 플러스인 추가 0526
  {
    src: path.resolve(__dirname, './src/plugins/dialog.js'),
    mode: 'client',
  },
  {
    src: path.resolve(__dirname, './src/plugins/daum-postcode'),
    mode: 'client',
  },
  {
    src: path.resolve(__dirname, './src/plugins/dialog.js'),
    mode: 'client',
  },
  // 스크롤바 플러스인 추가 0526
  {
    src: path.resolve(__dirname, './src/plugins/vuebar'),
    ssr: false,
  },
  {
    src: path.resolve(__dirname, './src/plugins/v-viewer.js'),
    ssr: false,
  },
  {
    src: path.resolve(__dirname, './src/plugins/util-dir.js'),
    ssr: false,
  },
  { src: path.resolve(__dirname, './src/common/filters') },
]
