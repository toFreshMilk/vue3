import _groupBy from 'lodash/groupBy'
import _get from 'lodash/get'
import _isEqual from 'lodash/isEqual'
import _isFunction from 'lodash/isFunction'

export function groupByKey (list, key, keepOrder = false) {
  if (!keepOrder) {
    return Object.values(_groupBy(list, i => _get(i, key)))
  }

  const result = []
  const firstItem = _get(list, '0')
  const isFuncKey = _isFunction(key)

  let previousValue = isFuncKey ? key(firstItem) : _get(firstItem, key)
  let previousList = []

  list.forEach((item) => {
    const value = isFuncKey ? key(item) : _get(item, key)

    if (_isEqual(value, previousValue)) {
      previousList.push(item)
    } else {
      result.push(previousList)
      previousList = [item]
      previousValue = value
    }
  })

  if (previousList.length) {
    result.push(previousList)
  }

  return result
}
