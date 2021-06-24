import { ActionTree, MutationTree, GetterTree, ActionContext } from 'vuex'
import isEmpty from "lodash/isEmpty";
import first from "lodash/first";

export const name = 'storeCategory'

export const types = {
  SET_CATEGORY_LIST: 'SET_CATEGORY_LIST',
  SET_CATEGORY_NO_HRCHY_LIST: 'SET_CATEGORY_NO_HRCHY_LIST',
}

export const namespaced = true

export const state = () => ({
  isLoaded: false,
  categoryList: [],
  categoryNoHrchyList: [],
})

export const getters = {
  getCategory: state => (category) => {
    const item = state.categoryNoHrchyList.find(item => item.category === category)
    return item || { name: '존재하지 않는 카테고리 입니다.' }
  },
  getCategoryPath: state => (category) => {
    return findCategoryPath(state, category);
  },
  getFirstCategory: state => () => {
    return first(state.categoryList);
  },
}

export const mutations = {
  [types.SET_CATEGORY_LIST]: (state, categoryList) => {
    state.categoryList = categoryList;
    state.isLoaded = true;
  },
  [types.SET_CATEGORY_NO_HRCHY_LIST]: (state, categoryList) => {
    state.categoryNoHrchyList = categoryList;
  },
}

export const actions = {
  [types.SET_CATEGORY_LIST]: ({ commit }, categoryList) => {
    commit(types.SET_CATEGORY_LIST, categoryList)
  },
  [types.SET_CATEGORY_NO_HRCHY_LIST]: ({ commit }, categoryList) => {
    commit(types.SET_CATEGORY_NO_HRCHY_LIST, categoryList)
  },
}

function findCategoryPath(state, category) {
  let path = new Array();
  const item = state.categoryNoHrchyList.find(item => item.category === category);
  if (!isEmpty(item)) {
    if (!isEmpty(item.superiorCategory)) {
      let subPath = findCategoryPath(state, item.superiorCategory);
      path.push(...subPath);
    }
    path.push(item);
  }

  return path;
}