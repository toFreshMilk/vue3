function isNumeric(num) {
  return !isNaN(num)
}

function replaceAll(text, find, replaceWith) {
  const escaped = find.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  return text.replace(regex, replaceWith);
}

export function formatTextNumber(value) {
  if (!value) return 0;

  value = value.toString()

  value = replaceAll(value, ',', '')

  if (isNumeric(value)) {
    value = Number(value)
  }
  return value.toLocaleString();
}