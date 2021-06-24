import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
// import { RootState } from 'store';
import Vue from 'vue'

import { getConfig } from '../../config'
const applicationConfig = getConfig()

export const name = 'site'

export const types = {
  SET_SITE_ID: 'SET_SITE_ID',
  SET_THEME: 'SET_THEME',
  SET_THEME_OVERRIDE: 'SET_THEME_OVERRIDE',
  SET_SITE_INFO: 'SET_SITE_INFO',
}

export const namespaced = true

export const state = () => ({
  id: null,
  theme: null,
  siteInfo: null,
  overrideThemeValue: null,
})

export const getters = {
  theme() {

  },
  commerceConfigs: (state) => {
    return state.siteInfo.commerceConfiguration || {}
  },

}

export const actions = {
  async setThemeOverride({ commit }, theme) {
    await commit(types.SET_THEME_OVERRIDE, theme)
  },

}

export const mutations = {
  [types.SET_SITE_ID](state, siteId) {
    state.id = siteId
  },

  [types.SET_THEME](state, theme) {
    state.theme = theme
  },

  [types.SET_THEME_OVERRIDE](state, theme) {
    state.overrideThemeValue = theme
  },

  [types.SET_SITE_INFO](state, siteInfo) {
    state.siteInfo = siteInfo
  },
}

export async function nuxtServerInit({ commit }, context) {
  const req = context.req
  const errorCallback = context.errorCallcak
  let targetPath
  let siteId = ''
  let hostname

  if (req) {
    const headers = req.headers
    const host = headers.host
    const hostTokens = host.split(/:/)
    hostname = hostTokens[0]

    targetPath = req.originalUrl.split(/\?|#/)[0]
  } else {
    targetPath = window.location.pathname
    hostname = location.hostname
  }

  const pathTokens = targetPath.split('/').filter((key) => {
    return (key || '').trim().length > 0
  }) //! '/ecomm/page1/' -> ["", "ecomm", "page1", ""]
  // ? ["ecomm", "page1"]

  if (applicationConfig.dynamicSiteRouting) {
    siteId = pathTokens[0]
  } else if (applicationConfig.exclusiveSiteId) {
    siteId = applicationConfig.exclusiveSiteId
  }

  if (!siteId) {
    siteId = applicationConfig.defaultSiteId
  }

  if (!siteId) {
    console.error('Store Error: SiteId is not defined anywhere.')
    // throw new Error(`Store Error: SiteID is not defined.`);
  }

  await commit(name + '/' + types.SET_SITE_ID, siteId)

  return { siteId }
}

export async function readSiteInfo(
  { commit },
  { req, app, route, store, error: errorCallback },
) {
  if (store.state.site.id) {
    try {
      const siteRes = await app.fetch({
        api: {
          path: '/svc/service/site',
          query: {
            id: store.state.site.id,
          },
        },
      })

      if (siteRes.data.item) {
        if (process.env.DEVICE === 'mobile') {
          await commit(
            name + '/' + types.SET_THEME,
            siteRes.data.item.mobileTheme,
          )
        } else {
          await commit(
            name + '/' + types.SET_THEME,
            siteRes.data.item.siteTheme,
          )
        }

        return await commit(name + '/' + types.SET_SITE_INFO, siteRes.data.item)
      }
    } catch (e) {
      console.warn('SiteID[' + store.state.site.id + '] is not available.', e)
    }
  }

  // console.error(`${store.state.site.id} is not available site.`)

  // errorCallback({
  //   statusCode: 500,
  //   message: `${store.state.site.id} is not available site.`,
  // });

  return store.state.site.id
}
