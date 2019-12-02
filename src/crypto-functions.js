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
  return additiveEncrypt(multiplicativeEncrypt(str, mKey), aKey);
}

export function affineDecrypt(str, mKey, aKey) {
  return multiplicativeDecrypt(additiveDecrypt(str, aKey), mKey);
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

export function columnarEncrypt(str, key) {
  str = cleanupString(str);
  key = cleanupString(key);
  while(str.length % key.length != 0) {
    str += "Q";
  }
  let cols = new Array(key.length).fill("")
  let k = 0;
  for(let i = 0; i < (str.length / key.length); i++) {
    for(let j = 0; j < key.length; j++, k++) {
      cols[j] += str.charAt(k);
    }
  }

  let pairs = []
  for(let l = 0; l < key.length; l++){
    pairs.push([charToInt(key.charAt(l)), cols[l]]);
  }
  pairs = pairs.sort(function(a,b) {
    return a[0] - b[0];
  });

  let out = ""
  pairs.forEach(pair => {out += pair[1]});
  return out;
}

export function columnarDecrypt(ciphertext, keyword) {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  var klen = keyword.length;
  // first we put the text into columns based on keyword length
  var cols = new Array(klen);
  var colLength = ciphertext.length / klen;
  for (let i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
  // now we rearrange the columns so that they are in their unscrambled state
  var newcols = new Array(klen);
  let j = 0;
  let i = 0;
  while (j < klen) {
    let t = keyword.indexOf(chars.charAt(i));
    if (t >= 0) {
      newcols[t] = cols[j++];
      let arrkw = keyword.split("");
      arrkw[t] = "_";
      keyword = arrkw.join("");
    } else i++;
  }
  // now read off the columns row-wise
  var plaintext = "";
  for (i = 0; i < colLength; i++) {
    for (j = 0; j < klen; j++) {
      plaintext += newcols[j].charAt(i);
    }
  }
  return plaintext.toLowerCase();
}
