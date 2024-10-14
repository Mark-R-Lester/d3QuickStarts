import { coordinatesAsStrings, coordinatesAsStringsFlipped, coordinatesFlipped, toStrings } from "./conversion";

describe('conversion testing', () => {

  test('to strings', () => {
    const arrays = [1, 1]
    expect(toStrings(arrays)).toEqual(['1', '1'])
  })

})

