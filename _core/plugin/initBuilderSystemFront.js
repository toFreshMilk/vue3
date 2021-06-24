import Vue from 'vue'
import Promise from 'bluebird'
// import { actionTypes } from '../store/page'

const domainTokens = location.hostname.split('.')
const domainScope = [domainTokens.pop(), domainTokens.pop()].reverse().join('.')

try {
  document.domain = domainScope
} catch (e) {
  console.error('Fail nuxt domain setting', e)
}

function EDITOR_MAIN_EVENTNAME(pageId) {
  return `__editor_main_${pageId}`
}

function GET_EDITOR_EVENT_SYSTEM() {
  return window.parent.___globalEventSystem
}

function LISTEN_EDITOR_MESSAGE(editorId, eventName, func) {
  return GET_EDITOR_EVENT_SYSTEM().on(`${eventName}[${editorId}]`, func)
}

/**
 * 초기 도메인 세팅 후에 일시적으로 크로스도메인문제로 블럭되는데 성공할 때 까지 시도한다.
 * @param editorId
 * @param eventName
 * @param data
 * @constructor
 */
function EMIT_PARENT_WINDOW(editorId, eventName, data) {
  // console.time('emit parent '+ eventKey);
  return new Promise((resolve) => {
    function tryDomain() {
      try {
        GET_EDITOR_EVENT_SYSTEM().emit(editorId, eventName, data)
        resolve()
      } catch (e) {
        setTimeout(tryDomain, 1)
      }
    }

    tryDomain()
  })
}

export default async function (context) {
  const EDITOR_ID = context.query.__editorId

  // if ( EDITOR_ID ) {
  //   context.store.dispatch( actionTypes.signEditor )
  // }

  if (parent && window !== parent.window) {
    function EMIT_MAIN_EDITOR_EVENT(eventName, data) {
      return EMIT_PARENT_WINDOW(EDITOR_MAIN_EVENTNAME(EDITOR_ID), eventName, data)
    }

    if (EDITOR_ID) {
      await EMIT_MAIN_EDITOR_EVENT('ready')

      Vue.prototype.editorId = EDITOR_ID
      Vue.prototype.LISTEN_EDITOR_MESSAGE = function (eventName, func) {
        LISTEN_EDITOR_MESSAGE(EDITOR_ID, eventName, func)
      }
      Vue.prototype.EMIT_PARENT_WINDOW = EMIT_PARENT_WINDOW
      Vue.prototype.EMIT_EDITOR_MAIN_EVENT = EMIT_MAIN_EDITOR_EVENT
    }
  }
}
