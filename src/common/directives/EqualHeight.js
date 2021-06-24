function removeHeights (selectors) {
  const elements = selectors && document.querySelectorAll(selectors.join(','))
  elements &&
    elements.forEach((element) => {
      element.style.removeProperty('height')
    })
}

function getMinHeight (elements) {
  let min = 0
  elements &&
    elements.forEach((element) => {
      element.offsetHeight > min && (min = element.offsetHeight)
    })

  return min
}

function shouldRun (rules) {
  let shouldRun = true
  rules &&
    rules.forEach((rule) => {
      let min = 0
      let max = rule

      if (typeof rule === 'object') {
        const assign = rule
        min = assign[0]
        max = assign[1]
      }

      if (window.innerWidth > min && window.innerWidth < max) {
        shouldRun = false
      }
    })

  return shouldRun
}

function matchHeights (selectors, disabled) {
  if (selectors === 0) { selectors = [] }
  if (disabled === 0) { disabled = [] }

  removeHeights(selectors)

  if (!shouldRun(disabled)) {
    return
  }

  selectors &&
    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector)
      const height = getMinHeight(elements)
      elements &&
        elements.forEach((element) => {
          element.style.height = height + 'px'
        })
    })
}

function matchHeightsFunc (binding) {
  matchHeights(binding.value.el, binding.value.disabled || [])
}

const directive = {
  inserted: (el, binding) => {
    setTimeout(() => {
      matchHeightsFunc(binding)
      const elements = document.querySelectorAll(binding.value.el)
      elements &&
        elements.forEach((el) => {
          const imgs = el.querySelectorAll('img')
          imgs &&
            imgs.forEach((img) => {
              img.addEventListener('load', matchHeightsFunc)
            })
        })
    }, 100)
  },
  bind: (el, binding) => {
    matchHeightsFunc(binding)
    window.addEventListener('resize', () => {
      setTimeout(() => {
        matchHeightsFunc(binding)
      }, 0)
    })
  },
  unbind: () => {
    window.removeEventListener('resize', () => undefined)
  },
}

export default directive
