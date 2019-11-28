import * as crypto from './crypto-functions.js'


it('removes punctuation', () => {
  expect(crypto.removePunctuation("test..2341&*")).toEqual('test')
})
