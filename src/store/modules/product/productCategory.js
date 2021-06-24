export const name = 'productCategory'

export const types = {
  SET_CATEGORY_LIST: 'SET_CATEGORY_LIST',
}

export const namespaced = true

export const state = () => ({
  isLoaded: false,
  categoryList: [],
})

export const getters = {
  findCategory: state => (category) => {
    const item = state.categoryList.find(item => item.category === category)
    return item;
  },
}

export const mutations = {
  [types.SET_CATEGORY_LIST]: (state, categoryList) => {
    state.categoryList = categoryList;
    state.isLoaded = true;
  },
}

export const actions = {
  [types.SET_CATEGORY_LIST]: ({ commit }, categoryList) => {
    commit(types.SET_CATEGORY_LIST, categoryList)
  },
}