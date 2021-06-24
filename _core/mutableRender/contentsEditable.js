
import Editable from './DefaultEditable'
import Vue from "vue";

export default {
  extends: Editable,
  layout: 'content',
  async middleware(context) {
    const req = context.req
    const store = context.store
    // const route = context.route;
    const app = context.app

    try {
      // const query = require('query-string').parse(req._parsedUrl.query)

      const contentsId = context.route.query.contentFragment
      const fragmentRes = await app.fetch({
        api: {
          path: '/svc/service/content',
        },
        query: {
          _siteId: store.state.site.id,
          id: contentsId,
          referenceView: 'instance',
        },
      })
      const fragmentItem = fragmentRes.data.item

      if (fragmentItem) {
        if (store.state.contentFragment.fragments[fragmentItem.id]) {
          store.state.contentFragment.fragments[fragmentItem.id] = fragmentItem
        } else {
          Vue.set(store.state.contentFragment.fragments, fragmentItem.id, fragmentItem)
        }
      }
    } catch (e) {
      console.error(e)
    }
  },

  validate(context) {

    const fragmentId = parseInt(context.route.query.contentFragment)

    if (fragmentId) {
      if (context.store.state.contentFragment.fragments[fragmentId]) {
        return true
      }
    }

    return false
  },

  // Override
  head() {
    return {

    }
  },

  computed: {
    authContext() {
      return this.$route.query.authContext || 'mng'
    },

    fragmentId() {
      return this.$route.query.contentFragment
    },

    fragment() {
      // console.log('this.$store.statethis.$store.state',this.$store.state);
      return this.$store.state.contentFragment.fragments[this.fragmentId]
    },

    instance() {
      return this.fragment.instance.item
    },
  },

  methods: {

    // Override
    setPageData(item) {
      // console.log('setPageData Contents', item)
      if (this.$store.state.contentFragment.fragments[item.id]) {
        this.$store.state.contentFragment.fragments[item.id] = item
      } else {
        Vue.set(this.$store.state.contentFragment.fragments, item.id, item)
      }
      // this.$store.commit('contentFragment/SET', item)
    },

    async updatedSVCPageData() {
      try {
        this.setPageData(await this.fetchPageData())
      } catch (e) {
        console.error(e)
        this.EMIT_EDITOR_MAIN_EVENT('fo-error-page-data', e)
      }

      console.error('Failed apply a updated service page.')
    },

    // Override
    async fetchPageData() {

      const fragmentRes = await this.fetch({
        api: {
          path: '/svc/service/content',
        },
        query: {
          id: this.fragmentId,
          referenceView: 'instance',
        },
      })

      return fragmentRes.data.item
    },
  },

  // ce : createElement
  render(ce) {

    if (!this.instance) {
      return ce('div', {}, ['Invalid Contents'])
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
      [
        ce('instance-renderer', {
          props: {
            instance: this.instance,
            options: {
              isRoot: true,
              area: 'body',
              zIndex: 2,
              defaultHeight: '50vh',
            },
          },
        }),
      ],
    )
  },
}
