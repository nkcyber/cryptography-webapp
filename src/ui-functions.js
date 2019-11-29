import * as R from 'ramda';
import * as crypto from './crypto-functions.js'

export function fetchBuffer(props, bufferName) {
  if (props.options.global) {
    return props.buffers[`global.${bufferName}`]
  }
  return props.buffers[`${props.location.pathname}.${bufferName}`]
}

export function binLetters(str) {
  return R.countBy(R.toUpper)(str)
}

export function frequencyAnalysis(str) {
  return R.mergeLeft(binLetters(str), R.zipObj("ABCDEFGHIJKLMNOPQRSTUVWXYZ", R.times(() => 0, 26)))
}
