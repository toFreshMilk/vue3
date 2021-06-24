import Vue from 'vue'
import _get from 'lodash/get'
import _map from 'lodash/map'
import _isPlainObject from 'lodash/isPlainObject'
import VueLocalStroage from 'vue-localstorage'
import { getConfig } from '../../config'

export default function (context) {
  const { app } = context
  const config = getConfig()

  /**
 * Latest Update 2020/04/08
 * Using in
 */
  Vue.mixin({
    computed: {
      $$inEditing() {
        return !!this.$route.query.__editorId
      },
    },
  })

  Vue.prototype.$getLabel = (o, defaultValue = '') => _isPlainObject(o) ? o.label : o || defaultValue

  Vue.prototype.$get = (o, key, defaultV) => _get(o, key, defaultV) || defaultV

  Vue.prototype.$getFromArrayObject = (o, array, key, defaultV) => _map(_get(o, array, defaultV) || defaultV, key).join(", ");

  Vue.use(VueLocalStroage, { name: 'localstorage' })

  Vue.prototype.$getFragmentInstance = async (fragmentId) => {
    const siteId = app.store.state.site.id
    const jwt = app.store.state.session.jwt2
    const fragmentRes = await app.fetch({
      api: {
        path: '/svc/service/content',
        withCredentials: true,
      },
      query: {
        _siteId: siteId,
        id: fragmentId,
        referenceView: 'instance',
      },
    })

    return fragmentRes
  }

  Vue.prototype.$getUserInfo = function () {
    return this.$get(this.$store.state, 'session.user', {})
  }

  Vue.prototype.$resizeImage = function (url = "", width, height, noImgSrc = "") {
    if (!url)
      return noImgSrc ? noImgSrc : 'img/noimage.png';
    const lastSlash = url.lastIndexOf('/');
    const path = url.slice(lastSlash - url.length)
    const first = url.slice(0, lastSlash);


    return `${first}/${width}/${height}${path}`;
  }
}
