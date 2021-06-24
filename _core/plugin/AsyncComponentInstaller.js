import Vue from 'vue'

export function registerCollection (collection) {
  /**
   * Common
   */
  Object.entries(collection).forEach(([key, component]) => {
    // component collection 의 모든 컴포넌트를 등록한다.
    Vue.component(key, component)
  })
}
