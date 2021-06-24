import Vue from 'vue'
export const name = 'api'

export const types = {
  SET: 'SET',
  REMOVE: 'REMOVE',
}

export const state = () => ({
  dictionary: {},
})

export const actions = {
  async [types.SET] ({ commit }, payload) {
    await commit(types.SET, payload)
  },

  async [types.REMOVE] ({ commit }, payload) {
    await commit(types.REMOVE, payload)
  },
}

export const mutations = {
  [types.SET] (state, { name, data }) {
    if (state.dictionary[name]) {
      state.dictionary[name] = data
    } else {
      Vue.set(state.dictionary, name, data)
    }
  },

  [types.REMOVE] (state, { name }) {
    if (state.dictionary[name]) {
      Vue.delete(state.dictionary, name)
    }
  },
}
