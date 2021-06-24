import jwtDecode from 'jwt-decode'
import get from 'lodash/get'
import CookieParser from 'set-cookie-parser'
import Vue from 'vue'

import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
// import { RootState } from 'store';

export const name = 'session'

export const types = {
  SUCCESS: 'success',
  FAIL: 'fail',
  SETJWT: 'setJwt',
}

export const namespaced = true

export const state = () => ({
  /*
  connected: false,
  status: false,
  signed: false,
  customer: null,
  cartProductCount: 0,
  */
  tokenName: '',
  refreshTokenName: '',
  jwt: '',
  jwt2: '',
  refresh: '',
  // signed: false,
  user: {},
  /* memberNo: null,
  siteId: null,
  nationality: null,
  name: null,
  userId: null,
  memberStatus: null,
  purchaseLimitAble: null,
  adultStatus: null,
  domesticForeigner: null, */
})

export const getters = {}

export const actions = {
  setJwt({ commit }, jwtPair) {
    // commit(name + '/' + types.SETJWT, jwtPair);
    commit(types.SETJWT, jwtPair)
  },

  success({ commit }, payload) {
    // commit(name + '/' + types.SUCCESS, payload);
    commit(types.SUCCESS, payload)
  },
}

export const mutations = {
  [types.SUCCESS](state, user) {
    state.user = user;
  },
  [types.SETJWT](state, jwtPair) {
    state.jwt = jwtPair.jwt || ''
    state.refresh = jwtPair.refresh || ''
    state.tokenName = jwtPair.tokenName || state.tokenName
    state.refreshTokenName = jwtPair.refreshTokenName || state.refreshTokenName
    state.jwt2 = jwtPair.jwt2 || state.jwt2
  },
}

function requestCookieParser(cookieString = '') {
  const cookies = cookieString.split(';')
  const cookieMap = {}
  for (const idx in cookies) {
    const pair = cookies[idx].trim().split('=')
    cookieMap[pair[0]] = pair[1]
  }

  return cookieMap
}

function fetchResponseSetCookieParser(fetchResponse) {
  const cookieMap = {}
  if (fetchResponse.headers['set-cookie']) {
    const setCookies = fetchResponse.headers['set-cookie']

    for (let i = 0; i < setCookies.length; i++) {
      const cookieObj = CookieParser.parse(setCookies[i])[0]
      cookieMap[cookieObj.name] = cookieObj
    }
  }

  return cookieMap
}

export async function getToken(
  { commit },
  context,
  ignoreOldTokens = false,
  _callSelf = 0,
) {
  const callSelf = _callSelf + 1
  const app = context.app
  const siteId = app.store.state.site.id
  const jwtCookieNm = siteId + 'SvcJWT'
  const refreshCookieNm = siteId + 'ReSvcJWT'
  const headers = context.req.headers
  const requestCookies = headers.cookie ||  ''
  const parsedOriginCookies = requestCookieParser(requestCookies)
  /**
   * First, Inject old tokens
   */

  await commit(name + '/' + types.SETJWT, {
    jwt: ignoreOldTokens ? '' : parsedOriginCookies[jwtCookieNm],
    refresh: ignoreOldTokens ? '' : parsedOriginCookies[refreshCookieNm],
    tokenName: jwtCookieNm,
    refreshTokenName: refreshCookieNm,
    jwt2: parsedOriginCookies.mngJWT || parsedOriginCookies.admJWT,
  })

  try {
    const sessionResponse = await app.fetch(
      {
        api: {
          path: '/auth/svc/jwt',
          method: 'get',
          withCredentials: true,
        },
        query: {},
      },
      null,
      context,
    )


    // 임시 매니저 세션 발급
    // await app.fetch({
    //   api: {
    //     path: '/auth/svc/jwt',
    //     method: "get",
    //     withCredentials: true,
    //   },
    //   query: {},
    // }, null, context);

    /**
     * Extract new Cookies
     */

    const setCookieHeader = sessionResponse.headers['set-cookie']
    const setCookieMap = fetchResponseSetCookieParser(sessionResponse)

    if (setCookieMap[jwtCookieNm]) {
      /**
       * JWT Cookie Save
       */
      await commit(name + '/' + types.SETJWT, {
        jwt: setCookieMap[jwtCookieNm].value,
        refresh: setCookieMap[jwtCookieNm].value,
      })
    }

    if (
      sessionResponse.status === '200' &&
      sessionResponse.data.item &&
      sessionResponse.data.item.code !== 'jwt' &&
      sessionResponse.data.item.code !== 'signed' &&
      sessionResponse.data.item.code !== 'unsigned'
    ) {
      /**
       * jwt만료 없음 현재는 그러므로 바로 토큰 재발급을 위해 throw new Error
       */
      throw new Error('EXPIRED TOKEN')
    }

    await updateSession(commit, sessionResponse)
    if (context.res && setCookieHeader) {
      context.res.setHeader('Set-Cookie', setCookieHeader)
    }

    return true
  } catch (e) {
    console.log(e);
    // console.error('Error : Session JWT Fail');
    // // if (callSelf > 2) {
    // //   throw new Error('cannot be called this over 2 times');
    // // }
  }
}

export async function nuxtServerInit({ commit }, context) {
  const app = context.app

  try {
    const meResponse = await app.fetch(
      {
        api: 'session/me',
        query: {},
        retrieveKey: 'loginStatus',
      },
      null,
      context,
    )
    await updateSession(commit, meResponse)
    return true
  } catch (e) {
    console.error('Error : fail read me.')
    await commit(types.FAIL, { status: 501, signed: false })
  }

  return true
}


export async function updateSession(commit, meResponse) {
  if (meResponse.data) {
    try {
      return await commit(name + '/' + types.SUCCESS, {
        signed: meResponse.data.item.code === 'signed',
        user: meResponse.data.item.customer,
        sessionkey: meResponse.data.item.sessionKey,
        // point: meResponse.data.item.point || {},
        // logo: meResponse.data.item.logo || '',
        // cartProductCount: meResponse.data.item.cartProductCount || 0,
      })
    } catch (e) {
      console.error('fail session update', e)
    }
  }
}
