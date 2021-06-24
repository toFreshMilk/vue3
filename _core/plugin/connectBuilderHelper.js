import Vue from 'vue'
import get from 'lodash/get'
import { $$getTheme } from '../helper/builderComponent'

export function LayoutHandler (context) {
  let theme = context.app.$$getTheme()

  const {
    _theme,
    _layout,
  } = context.route.query

  if (_layout) {
    return _layout
  }

  if (_theme) {
    theme = _theme
  }

  return `${theme}/default`
}

Vue.mixin({
  layout: LayoutHandler,
})

export default ({ app }, inject) => {
  Vue.use({
    install (Vue, options) {
      Vue.prototype.$$getTheme = $$getTheme
    },
  })

  app.$$getTheme = $$getTheme
}
