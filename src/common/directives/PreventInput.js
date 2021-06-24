import { get, set } from 'lodash'

const directive = {
  inserted: (el, binding, vnode) => {
    const uagent = navigator.userAgent
    const isIE =
      uagent.includes('MSIE ') || uagent.includes('Trident/')
    const event = isIE ? 'textinput' : 'input'
    let regex = ''
    switch (binding.value) {
      case 'number':
        regex = /[0-9$&+,:;=?!`@#|{}'<>.^*()%~-]/g
        break
      case 'korean':
        regex = /[^a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-]/g
        break
      case 'character':
        regex = /[^0-9]/g
        break
    }

    el.addEventListener(event, (e) => {
      if (e && e.target) {
        const target = e.target

        if (target.value) {
          target.value = target.value.replace(regex, '')
          const vModel = get(vnode, 'data.model.expression', '')
          set(vnode.context, vModel, target.value)
        }
      }
    })
  },
}

export default directive
