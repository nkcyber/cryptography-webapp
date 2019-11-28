import * as crypto from './crypto-functions.js'


it('removes punctuation', () => {
  expect(crypto.cleanupString("test..2341&*")).toEqual('TEST')
})

it('formats in blocks of length 5 by defualt', () => {
  expect(crypto.blockFormat("testing the formatting")).toEqual('TESTI NGTHE FORMA TTING')
})

it('formats in blocks of length given by arguement', () => {
  expect(crypto.blockFormat("testing the formatting", 2)).toEqual('TE ST IN GT HE FO RM AT TI NG')
})

describe('multiplicative', () => {
  it('correctly enciphers', () => {
    expect(crypto.multiplicativeEncrypt("testing", 5)).toEqual('RUMRONE')
  })

  it('correctly deciphers', () => {
    expect(crypto.multiplicativeDecrypt("RUMRONE", 5)).toEqual('TESTING')
  })
})

describe('additive', () => {
  it('correctly enciphers', () => {
    expect(crypto.additive("testing", 3)).toEqual('WHVWLQJ')
  })

  it('correctly deciphers', () => {
    expect(crypto.additiveInv("WHVWLQJ", 3)).toEqual('TESTING')
  })
})

it('alphabet shifts', () => {
  expect(crypto.additive("abc", 5)).toEqual('fgh'.toUpperCase())
})

it('maps alphabets', () => {
  expect(crypto.mapAlphabet("abc", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "FGHIJKLMNOPQRSTUVWXYZABCDE")).toEqual('FGH')
})
