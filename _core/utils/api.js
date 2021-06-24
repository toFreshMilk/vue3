import axios, { AxiosRequestConfig, AxiosResponse } from 'axios/index'

import Promise from 'bluebird'
import pick from 'lodash/pick'
import jsonBeautifier from 'json-beautify'
import moment from 'moment'
import { getConfig } from '../../config'
const clc = {
  green: a => a,
  red: a => a,
  blue: a => a,
  info: a => a,
  yellow: a => a,
  cyanBright: {
    bold: a => a,
  },
}
const config = getConfig()

const ENABLED_LOG = false

const isServer = process.server

export function getAxios() {
  const host = config.apiHost

  let baseURL

  if (isServer) {
    baseURL = `http://${host}/`
  } else {
    baseURL = `//${host}/`
    if (config.protocol) {
      baseURL = config.protocol + baseURL
    }
  }

  return axios.create({
    baseURL,
    timeout: 99000,
    withCredentials: true,
  })
}

/**
 * Fetch
 * @param options : fetch 대상 명세 options
 * @returns {Promise<*>}
 */
export async function fetch(
  application,
  options,
) {
  const serverSide = isServer
  const ax = getAxios()

  let baseURL = options.baseURL

  // [등록된 function 명 또는 function객체]의 배열또는 그 자체, 요청 응답이 정상적이면 순차적으로 호출되어 필터링 한다.
  let filterFunctions = options.filterFunctions || []

  const {
    api,

    log = true,
  } = options

  // console.info(
  //   clc.green('---------------------- <Fetch> ----------------------'),
  // )

  let {
    withCredentials = true,
    query, // HTTP 쿼리 오브젝트
    data, // body 데이터로 전송 될 데이터 JSON또는 문자열
    headers,
  } = options

  // 오류 벨리데이션 추가 2018.11.23 - favicon.ico 호출하시는 부분 아시는 분은 호출부에서 제거해주세요.
  // if (((api || {}).query || {}).id === 'favicon.ico') return null;

  const binder = application
  const siteId = binder.store.state.site.id

  let apiSheet = api
  if (typeof apiSheet === 'string') {
    apiSheet = require('../../src/fetchSheets/' + apiSheet).default
  }

  const {
    path,

    withCredentials: defaultWithCredentials,
  } = apiSheet
  const mockData = apiSheet.mockup
  const mockupOptions = apiSheet.mockupOptions
  let method = apiSheet.method || 'get'
  let multipart = apiSheet.multipart || false
  const { query: defaultQuery, data: defaultData } = apiSheet

  query = {
    ...defaultQuery,
    ...query,
  }

  data = {
    ...defaultData,
    ...data,
  }

  /*
   *
   * 2018 11 27 deviceType 추가
   *
   * */

  if (method === 'post') {
    data._siteId = siteId
    // data._pil = pil;
    data._deviceType = binder.$device.isDesktop ? 'pc' : 'mobile'
  } else {
    query._siteId = siteId
    // query._pil = pil;
    query._deviceType = binder.$device.isDesktop ? 'pc' : 'mobile'
  }

  headers = {
    ...headers,
  }


  const sessionState = binder.store.state.session
  if (isServer && sessionState.jwt) {
    headers.cookie =
      (headers.cookie ? headers.cookie.trim().replace(/(;$|$)/, ';') : '') +
      `${sessionState.tokenName}=${sessionState.jwt}; ` +
      `${sessionState.refreshTokenName}=${sessionState.refresh};`
  }


  if (defaultWithCredentials !== undefined) {
    withCredentials = defaultWithCredentials
  }

  if (method === 'post') {
    const dataKeys = Object.keys(data)

    for (let i = 0; i < dataKeys.length; i++) {
      if (!serverSide && data[dataKeys[i]] instanceof File) {
        multipart = true
        break
      }
    }
  }

  method = method.toLowerCase()

  const requestOptions = {
    url: path,
    params: query,
    headers: {
      ...headers,
    },
    method,
    withCredentials,
  }

  // baseURL이 [loopback] 으로 입력되면 자신의 호스트를 baseURL로 사용한다.
  if (baseURL === '[loopback]') {
    requestOptions.baseURL = ''
  } else if (baseURL) {
    requestOptions.baseURL = `http://${baseURL}`
  } else {
    baseURL = ax.defaults.baseURL
  }

  if (data) {
    if (multipart) {
      if (data instanceof FormData) {
        requestOptions.data = data
      } else {
        const formData = new FormData()
        const keys = Object.keys(data)

        let key
        let value
        for (let i = 0; i < keys.length; i++) {
          key = keys[i]
          value = data[key]

          if (typeof value === 'object' && !(value instanceof File)) {
            value = JSON.stringify(value)
          }
          formData.append(key, value)
        }

        requestOptions.data = formData
      }
    } else if (typeof data === 'string') {
      requestOptions.data = data
    } else {
      // data = {
      //     ...data,
      // }

      const keys = Object.keys(data)
      const queries = []
      let key

      let queryData
      for (let i = 0; i < keys.length; i++) {
        key = keys[i]
        queryData = data[key]

        if (typeof queryData === 'object') {
          queryData = encodeURIComponent(JSON.stringify(queryData))
        } else if (typeof queryData === 'string') {
          queryData = encodeURIComponent(queryData)
        }

        queries.push(`${key}=${queryData}`)
      }
      requestOptions.data = queries.join('&')
    }
  }

  let apiResponse = null


  /** ******************************
   * Request
   */

  try {
    apiResponse = await ax.request(requestOptions)
  } catch (err) {

    throw new Error(err)
  }
  /**
   * End Request
   */

  // return apiResponse;
  return pick(apiResponse, [
    'data',
    'config',
    'headers',
    'statusText',
    'status',
  ])
}