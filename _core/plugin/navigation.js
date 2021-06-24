import Vue from 'vue'
import qs from 'query-string'
import { getConfig } from '@@/config'
import startsWith from 'lodash/startsWith'

const config = getConfig()

export default function (context) {
  const { app } = context

  Vue.prototype.$getProjectHref = function (pathOrOptions = '#', hash = '') {
    const sitePrefix = (app.store.state.site || {}).id
    return this.$getHref(pathOrOptions, hash, sitePrefix)
  }
  Vue.prototype.$getHref = function (
    pathOrOptions,
    hash = '',
    site = (app.store.state.site || {}).id,
  ) {
    /**
     @pathOrOptions 링크
     @hash 해쉬값
     **/

    let sitePrefix
    if (site && config.dynamicSiteRouting) {
      sitePrefix = '/' + site
    } else {
      sitePrefix = ''
    }

    if (!pathOrOptions) {
      return '#'
    }

    if (typeof pathOrOptions === 'string') {
      let queryString, hashInPath
      const firstTokens = pathOrOptions.split('?')

      const path = firstTokens[0]
      queryString = firstTokens[1]
      if (firstTokens[1]) {
        const secondTokens = firstTokens[1].split('#')

        queryString = secondTokens[0]
        hashInPath = secondTokens[1]
      }

      const queryMap = qs.parse(queryString)

      pathOrOptions = {
        path,
        query: queryMap,
        hash: hashInPath,
      }
    }

    const query = pathOrOptions.query
    let path = pathOrOptions.path

    if (this.$route.query && this.$route.query._iref) {
      query._iref = this.$route.query._iref
    } else if (this.instanceId) {
      query._iref = this.instanceId
    }

    if (path) {
      if (/^https?:\/\//.test(path)) {
        return `${path}?${qs.stringify(query)}`
      } else {
        path = `/${path.replace(/^\//, '')}`
        /*  /${prefix}  */

        let url = path
        if (query && Object.keys(query).length > 0) {
          url += '?' + qs.stringify(query)
        }

        url = sitePrefix.concat(url)

        if (hash) {
          url += '#' + hash
        }

        return url
      }
    } else {
      let url = `?${qs.stringify(query)}`

      if (hash) {
        url += '#' + hash
      }

      return url
    }
  }

  Vue.prototype.$isSigned = function () {
    return this.$get(this.$store.state, 'session.user.signed', false)
  }

  Vue.prototype.$fullFileUrl = function (storePath) {
    let url = this.$get(storePath, 'storePath', storePath) || ''

    if (!url) { return '' }
    if (startsWith(url, 'http') || startsWith(url, 'https')) {
      return url
    }
    //const protocol = '//'  use the current open web browser protocol
    // const result = startsWith(url, config.apiHost) ? `${protocol}${url}` : `${protocol}${config.apiHost}/${url}`
    const result = `${config.cdnUrl}${url}`
    return result
  }
}
