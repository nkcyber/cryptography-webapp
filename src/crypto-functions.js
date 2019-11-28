

export function removePunctuation(str) {
  return str.replace(/[^a-zA-Z]+/g, '')
}

export function blockFormat(str, len=5) {
  return removePunctuation(str).match(new RegExp('.{1,' + len + '}', 'g')).reduce((a, b) => a + " " + b);
}

export function charToInt(chr) {
  return chr.toUpperCase().charCodeAt(0) - 65
}

export function intToChar(int) {
  return String.fromCharCode(int + 65)
}

export function multiplicativeEncrypt(str, key)  {
  return R.map(a => intToChar((charToInt(a) * key) % 26), str)
}
