

export function removePunctuation(str) {
  return str.replace(/[^a-zA-Z]+/g, '')
}

export function blockFormat(str, len=5) {
  return removePunctuation(str).match(new RegExp('.{1,' + len + '}', 'g')).reduce((a, b) => a + " " + b);
}
