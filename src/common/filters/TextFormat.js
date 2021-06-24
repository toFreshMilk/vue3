/**
 * 줄바꿈처리 (\n -> <br/>)
 * @param {*} value 
 * @returns 
 */
export function formatBreakLineText(value) {
  if (!value) return '';
  let text = value;
  while (text.indexOf('\n\n') !== -1) {
    text = text.replace('\n\n', '\n');
  }
  return text.split('\n').join('<br/>');
}
