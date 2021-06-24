import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
export const name = 'interior'
export const namespaced = true

export const types = {
  SET_DATA: 'SET_DATA',
  SET_DEFAULT_FILTER: 'SET_DEFAULT_FILTER',
}
export const state = () => ({
  hasData: {
    name : "aa",
    async : "aa1",
    nonsync : "aa2",
  },
  common_filters: [],
})
export const getters = {
  getIRData: state => () => {
    return state.hasData.name
  },
  getCommonFilter: state => () => {
    return state.common_filters
  }
};
export const actions = {
  [types.SET_DATA]: ({ commit }, data) => {
    commit(types.SET_DATA, data);
  },
  [types.SET_DEFAULT_FILTER]: ({ commit }, data) => {
    commit(types.SET_DEFAULT_FILTER, data);
  },
}
export const mutations = {
  [types.SET_DATA]: (state, data) => {
    state.hasData.name = data;
  },
  [types.SET_DEFAULT_FILTER]: (state, data) => {
    state.common_filters = data;
  },
}
