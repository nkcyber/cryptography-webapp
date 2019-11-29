import * as R from 'ramda';
import {add} from "ramda";

export function blockFormat(str, len=5) {
  return cleanupString(str).match(new RegExp('.{1,' + len + '}', 'g')).reduce((a, b) => a + " " + b);
}

export function cleanupString(str) {
  return str.replace(/[^a-zA-Z]+/g, '').toUpperCase()
}

export function mapAlphabet(str, a1, a2) {
  let dict = R.zipObj(a1, a2);
  return cleanupString(str).replace(/[A-Z]/g, m => dict[m]);
}

export function additiveEncrypt(str, key) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const newAlph = R.concat(R.drop(key, alph), R.take(key, alph));
  return mapAlphabet(str, alph, newAlph);
}

export function additiveDecrypt(str, key) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const newAlph = R.concat(R.drop(key, alph), R.take(key, alph));
  return mapAlphabet(str, newAlph, alph);
}

export function affineEncrypt(str, mKey, aKey) {
  return additive(multiplicativeEncrypt(str, mKey), aKey);
}

export function affineDecrypt(str, mKey, aKey) {
  return multiplicativeDecrypt(additiveInv(str, aKey), mKey);
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

export function masc(str, key) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return mapAlphabet(str, alph, key);
}

export function mascDecrypt(str, key) {
  const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return mapAlphabet(str, key, alph);
}

export function multiplicativeEncrypt(str, key)  {
  return R.map(a => intToChar((charToInt(a) * key) % 26), str).join('')
}

export function multiplicativeDecrypt(str, key)  {
  return R.map(a => intToChar((charToInt(a) * modInv(key, 26)) % 26), str).join('')
}

export function getVigenereKey(str, key) {
  if(key.length < str.length) {
    const repTimes = Math.ceil(str.length / key.length);
    key = R.take(str.length, key.repeat(repTimes));
    return key.toString();
  }
}

export function vigenereEncrypt(str, key) {
  str = cleanupString(str);
  key = getVigenereKey(str, cleanupString(key));
  let outStr = "";
  while(str.length > 0) {
    let tempStr = str.substr(0,1);
    str = str.substr(1);
    let tempKey = charToInt(key.substr(0,1));
    key = key.substr(1);

    outStr += additiveEncrypt(tempStr, tempKey);
  }
  return outStr
}

export function vigenereDecrypt(str, key) {
  str = cleanupString(str);
  key = getVigenereKey(str, cleanupString(key));
  let outStr = "";
  while(str.length > 0) {
    let tempStr = str.substr(0,1);
    str = str.substr(1);
    let tempKey = charToInt(key.substr(0,1));
    key = key.substr(1);

    outStr += additiveDecrypt(tempStr, tempKey);
  }
  return outStr
}

//If the letter doesnt exist it's value is undefined in the returned dictionary
export function getFrequencies(str) {
  let counter = str => {
    return str.split('').reduce((total, letter) => {
      total[letter] ? total[letter]++ : total[letter] = 1;
      return total;
    }, {});
  };
  return counter(str);
}
