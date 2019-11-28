import * as crypto from './crypto-functions.js'


it('removes punctuation', () => {
  expect(crypto.cleanupString("test..2341&*")).toEqual('test')
})

it('formats in blocks of length 5 by defualt', () => {
  expect(crypto.blockFormat("testing the formatting")).toEqual('testi ngthe forma tting')
})

it('formats in blocks of length given by arguement', () => {
  expect(crypto.blockFormat("testing the formatting", 2)).toEqual('te st in gt he fo rm at ti ng')
})

it('correctly enciphers', () => {
  expect(crypto.multiplicativeEncrypt("testing", 5)).toEqual('rumrone')
})
