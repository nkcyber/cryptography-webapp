import * as R from 'ramda';

export function blockFormat(str, len=5) {
  return removePunctuation(str).match(new RegExp('.{1,' + len + '}', 'g')).reduce((a, b) => a + " " + b);
}

export function cleanupString(str) {
  return str.replace(/[^a-zA-Z]+/g, '').toUpperCase()
}

export function formatOutput(str) {

}

export function makeDictionary() {

}

export function mapAlphabet(str, a1, a2) {
  let dict = R.zipObj(a1, a2);
  return str.replace(/[a-z]/gi, m => dict[m]);
}

export function additive(str, key) {
  let alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return R.concat(R.drop(key, alph), R.take(key, alph));
}

export function multiplicitave(str, key) {

}

export function affine(str, mKey, aKey) {

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
