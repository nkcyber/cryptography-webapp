import * as R from 'ramda';

export function blockFormat(str, len=5) {
  return cleanupString(str).match(new RegExp('.{1,' + len + '}', 'g')).reduce((a, b) => a + " " + b);
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

function xgcd(a, b) {

  if (b == 0) {
    return [1, 0, a];
  }

  let temp = xgcd(b, a % b);
  let x = temp[0];
  let y = temp[1];
  let d = temp[2];
  return [y, x-y*Math.floor(a/b), d];
 }

export function modInv(a, m)  {
  return (xgcd(a, m)[0] + m) % 26
}

export function multiplicativeEncrypt(str, key)  {
  return R.map(a => intToChar((charToInt(a) * key) % 26), str).join('')
}

export function multiplicativeDecrypt(str, key)  {
  return R.map(a => intToChar((charToInt(a) * modInv(key, 26)) % 26), str).join('')
}
