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
  return cleanupString(str).replace(/[A-Z]/g, m => dict[m]);
}

export function additive(str, key) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const newAlph = R.concat(R.drop(key, alph), R.take(key, alph));
  return mapAlphabet(str, alph, newAlph);
}

export function multiplicitave(str, key) {

}

export function affine(str, mKey, aKey) {

}
