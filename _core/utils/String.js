export function convertToStylesObject(text) {
  if (!text || !text.split) { return {} }

  text = text.replace(/(?:\r\n|\r|\n)/g, ';')

  text = text.replace(/\{|\}/g, '')

  const result = text.split(';').filter(i => !!i.trim() && i.includes(':')).reduce(function (ruleMap, ruleString) {
    const [left, right] = ruleString.split(':')
    const attribute = left.trim().replace(/-(.)/g, (match, group1) => group1.toUpperCase())

    ruleMap[attribute] = right.trim()

    return ruleMap
  }, {})

  return result
}
