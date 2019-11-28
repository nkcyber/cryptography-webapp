

export function removePunctuation(str) {
  return str.replace(/[^a-zA-Z]+/g, '')
}
