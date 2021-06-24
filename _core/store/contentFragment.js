import Vue from 'vue'

export const name = 'contentFragment'

export const types = {
  SET: 'SET',
  REMOVE: 'REMOVE',
}

export const state = () => ({
  fragments: {},
})

export const actions = {
  async set({ commit }, payload) {
    await commit(types.SET, payload)
  },
}

export const mutations = {
  [types.SET]: (state, item) => {
    if (state.fragments[item.id]) {
      state.fragments[item.id] = item
    } else {
      Vue.set(state.fragments, item.id, item)
    }
  },
}
