import Vue from 'vue'
import get from 'lodash/get'
import { fetch } from '../utils/api'

import { types, name } from '../store/http'

export default function (context) {
  const { app } = context

  app.fetch = fetch.bind(null, app)
  app.load = async function (key, options) {
    await app.store.commit(name + '/' + types.BEGIN, {
      accessKey: key,
    })

    try {
      const result = await fetch.bind(null, app)(options)

      await app.store.commit(name + '/' + types.FINISH, {
        accessKey: key,
        response: result,
      })
    } catch (e) {
      await app.store.commit(name + '/' + types.FINISH, {
        accessKey: key,
        response: {},
        hesError: true,
      })
    }
  }

  app.load = app.load.bind(app)

  Vue.prototype.$fetch = function (
    options,
  ) {
    return fetch.bind(null, app)(options)
  }

  Vue.prototype.fetch = function (options) {
    return this.$fetch(options)
  }
}
