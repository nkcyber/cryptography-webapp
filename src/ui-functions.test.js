import * as R from 'ramda';
import * as ui from './ui-functions.js'

describe('frequencyAnalysis', () => {
  it('correctly enciphers', () => {
    expect(ui.frequencyAnalysis("testing")).toEqual({
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0,
        "E": 1,
        "F": 0,
        "G": 1,
        "H": 0,
        "I": 1,
        "J": 0,
        "K": 0,
        "L": 0,
        "M": 0,
        "N": 1,
        "O": 0,
        "P": 0,
        "Q": 0,
        "R": 0,
        "S": 1,
        "T": 2,
        "U": 0,
        "V": 0,
        "W": 0,
        "X": 0,
        "Y": 0,
        "Z": 0,})
  })
})
