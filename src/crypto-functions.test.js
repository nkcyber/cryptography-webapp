import * as crypto from './crypto-functions.js'


it('removes punctuation', () => {
  expect(crypto.cleanupString("test..2341&*")).toEqual('TEST')
})

it('formats in blocks of length 5 by defualt', () => {
  expect(crypto.blockFormat("testing the formatting")).toEqual('testi ngthe forma tting')
})

it('formats in blocks of length given by arguement', () => {
  expect(crypto.blockFormat("testing the formatting", 2)).toEqual('te st in gt he fo rm at ti ng')
})

it('formats in blocks of length 5 by defualt', () => {
  expect(crypto.blockFormat("testing the formatting")).toEqual('testi ngthe forma tting')
})

it('alphabet shifts', () => {
  expect(crypto.additive("abc", 5)).toEqual('fgh'.toUpperCase())
})

it('maps alphabets', () => {
  expect(crypto.mapAlphabet("abc", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "FGHIJKLMNOPQRSTUVWXYZABCDE")).toEqual('FGH')
})