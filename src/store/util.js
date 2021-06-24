import Vue from 'vue'

const actionType = {
  TOGGLENAVBAR: 'TOGGLENAVBAR',
  RETURNURL: 'RETURNURL',
  RESETURL: 'RESETURL'
}

export const state = () => ({
  isOpenNavBar: false,
  returnUrl: '',
})

export const getters = {}

export const actions = {
  toggleNavBar ({ commit }, status) {
    return commit(actionType.TOGGLENAVBAR, status)
  },
}
export const mutations = {
  [actionType.TOGGLENAVBAR]: (state, status) => {
    Vue.set(state, 'isOpenNavBar', status)
  },

  [actionType.RETURNURL]: (state, status) => {
    Vue.set(state, 'returnUrl', status)
  },

  [actionType.RESETURL]: (state) => {
    state.returnUrl = ''
  },
}
