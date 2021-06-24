import EditablePageParams from '../common/editablePageParams'
import InstanceRenderer from '../components/instanceRenderer'
import './editorSupport.scss'
import { namespace } from 'vuex-class'

import * as page from '../store/page'

import { getConfig } from '../../config'
// import { LayoutHandler } from '../plugin/connectBuilderHelper'

const axios = require('axios')
// s
const Page = namespace(page.name)

const config = getConfig()

const ax = axios.create({
  baseURL: `//${config.apiHost}`,
  withCredentials: true,
  timeout: 1000,
})

function getComponentKey (instance) {
  if (instance.component) {
    const tokens = instance.componentId.value.split(':')
    return instance.id
  }

  throw new Error(
    `DynamicPage rendering error : Not found componentKey in Instance#${
      instance.renderId
    }`,
  )
}

export default {
  components: {
    InstanceRenderer,
  },

  data () {
    return {
      hoveringInstanceId: null,
      dragging: false,
      pageType: true,
    }
  },

  computed: {
    instanceWrapper () {
      // context.store.getters['page/seedSvcPage']
      return this.$store.state.page.seedSvcPage
    },

    authContext () {
      return this.$route.query.authContext || 'mng'
    },

    device () {
      return this.$route.query.device || this.$store.state.device.type
    },
  },

  validate (context) {
    if (context.store.getters['page/seedSvcPage']) {
      return true //
    }

    throw new Error('Not found DP')
  },

  layout (context) {
    // const site = context.store.state.site

    // if (site && site.theme) {
    //   const theme = context.app.$$getTheme()

    //   const page = context.store.state.page.seedSvcPage
    //   if (page) {
    //     if (context.store.state.device.type === 'pc' && page.layout && page.layout.item) {
    //       return page.layout.item.code
    //     } else if (context.store.state.device.type === 'mobile' && page.layoutMobile && page.layoutMobile.item) {
    //       return page.layoutMobile.item.code
    //     }
    //   }

    //   return `${theme}/default`
    // } else {
    //   return LayoutHandler(context)
    // }

    return 'default'
  },

  mounted () {
    if (this.LISTEN_EDITOR_MESSAGE) {
      this.LISTEN_EDITOR_MESSAGE('updatedPage', async (data) => {
        const { inEditorFlashDataStore } = data
        await this.updatedSVCPageData()
        // Should reset falsh data after updatedSVCPageData
        this.$store.commit(page.name + '/' + page.types.UPDATE_EDITOR_FLASH_DATA_STORE, {})

        this.$nextTick(() => {
          this.EMIT_EDITOR_MAIN_EVENT('rendered-vue-page')
          /**
           * UpdatePage Event 를 발생시킨자가 nextTick 이벤트를 수신할 수 있도록 제공
           */
          if (typeof data.nextTick === 'function') {
            data.nextTick()
          }
        })
      })

      this.LISTEN_EDITOR_MESSAGE('flashUpdatedPage', async (data) => {
        const { inEditorFlashDataStore } = data
        this.hoveringInstanceId = data.hoveringInstanceId
        this.$store.commit(page.name + '/' + page.types.UPDATE_EDITOR_FLASH_DATA_STORE, inEditorFlashDataStore)

        this.$nextTick(() => {
          this.EMIT_EDITOR_MAIN_EVENT('flash-rendered-vue-page')
          if (data.nextTick) {
            data.nextTick()
          }
        })
      })

      this.LISTEN_EDITOR_MESSAGE('notice', async (data) => {
        const key = data.key
        const eData = data.data

        if (key === 'willBeInsertedInst') {
          // await this.$store.commit(actionTypes.willInsertInstance, {
          // 	instanceId: eData.instanceId,
          // });
        }
      })

      this.LISTEN_EDITOR_MESSAGE(
        'change-component-hover-state',
        async (data = {}) => {
          // this.editorFlashDataStore = inEditorFlashDataStore;
          this.hoveringInstanceId = data.hoveringInstanceId

          if (data.dragging !== undefined) {
            // await this.props.setPageState( '_editmode_expandMargin', data.dragging );

            this.dragging = data.dragging
          }

          // this.$nextTick(() => {
          //   this.EMIT_EDITOR_MAIN_EVENT('flash-rendered-vue-page')
          // })
        },
      )
    }
  },

  methods: {
    setPageData (item) {
      this.$store.commit(page.name + '/' + page.types.SET_SEED, item)
    },

    async fetchPageData () {
      const res = await ax.request({
        url: '/' + this.authContext + '/foPage/read',
        timeout: 100000,
        params: {
          id: this.$store.state.page.pageId,
          ...EditablePageParams,
        },
      })

      return res.data.item
    },

    // Override
    async updatedSVCPageData () {
      try {
        this.setPageData(await this.fetchPageData())
      } catch (e) {
        console.error(e)
        this.EMIT_EDITOR_MAIN_EVENT('fo-error-page-data', e)
      }

      console.error('Failed apply a updated service page.')
    },
  },

  head (context) {
    if (this.$store.state.page) {
      let meta = []
      const bodyStyles = {}

      const page = this.$store.state.page.seedSvcPage
      if (!page) { return }
      if (page.seoConfigs && Array.isArray(page.seoConfigs)) {
        meta = page.seoConfigs.filter(v => !!v).map(config => ({
          hid: config.name,
          name: config.name,
          content: config.content,
          property: config.property || undefined,
        }))
      }

      let backgroundOptions = {}

      if ((this.device === 'pc' || this.device === 'desktop') && page.background) {
        backgroundOptions = page.background
      } else if (this.device === 'mobile' && page.mobileBackground) {
        backgroundOptions = page.mobileBackground
      }

      if (backgroundOptions.cssColor) {
        bodyStyles['background-color'] = backgroundOptions.cssColor
      }
      if (backgroundOptions.image) {
        bodyStyles['background-image'] = `url(${this.$cmsSrc(backgroundOptions.image.fileValue)})`
      }

      if (backgroundOptions.imageSizing) {
        bodyStyles['background-size'] = backgroundOptions.imageSizing.value
      }

      return {
        title: page.title || null,
        bodyAttrs: {
          style: Object.keys(bodyStyles).map(k => `${k}:${bodyStyles[k]}`).join(';'),
        },
        meta: [
          ...meta,

        ],
      }
    }

    return {

    }
  },

  // ce : createElement
  render (ce) {
    // checkDevice
    // this.instanceWrapper.mobileContainerId

    const deviceType = this.$store.state.device.type
    let useMobileContainer = false
    if (deviceType === 'mobile' || deviceType === 'app') {
      useMobileContainer = true
    }

    let bodyElements
    if (
      this.instanceWrapper[useMobileContainer ? 'mobileInstance' : 'instance']
    ) {
      bodyElements = ce('instance-renderer', {
        props: {
          instance: this.instanceWrapper[
            useMobileContainer ? 'mobileInstance' : 'instance'
          ].item,
          options: {
            isRoot: true,
            area: 'body',
            zIndex: 2,
            defaultHeight: '50vh',
          },
        },
      })
    } else {
      bodyElements = ce('div', {}, ['Invalid Page'])
    }

    let headElements
    if (
      this.instanceWrapper[
        useMobileContainer ? 'mobileHeadInstance' : 'headInstance'
      ]
    ) {
      headElements = ce('instance-renderer', {
        props: {
          instance: this.instanceWrapper[
            useMobileContainer ? 'mobileHeadInstance' : 'headInstance'
          ].item,
          options: {
            isRoot: true,
            area: 'head',
            zIndex: 3,
            defaultHeight: '20px',
          },
        },
      })
    } else {
      headElements = null
    }

    let footElements
    if (
      this.instanceWrapper[
        useMobileContainer ? 'mobileFootInstance' : 'footInstance'
      ]
    ) {
      footElements = ce('instance-renderer', {
        props: {
          instance: this.instanceWrapper[
            useMobileContainer ? 'mobileFootInstance' : 'footInstance'
          ].item,
          options: {
            isRoot: true,
            area: 'foot',
            zIndex: 1,
            defaultHeight: '100px',
          },
        },
      })
    } else {
      footElements = null
    }

    return ce(
      'div',
      {
        attrs: {
          id: 'editablePageContents',
        },
        class: {
          dragging: this.dragging,
          expand:
            this.hoveringInstanceId !== undefined &&
            this.hoveringInstanceId !== null,
        },
      },
      [headElements, bodyElements, footElements],
    )
  },
}
