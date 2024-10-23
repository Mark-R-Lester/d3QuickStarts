export const coordinatesAsStrings = (
  coordinates: [number, number][]
): string[][] => {
  return coordinates.map((coordinate) => [
    coordinate[0].toString(),
    coordinate[1].toString(),
  ])
}

export const coordinatesAsStringsFlipped = (
  coordinates: [number, number][]
): string[][] => {
  return coordinates.map((coordinate) => [
    coordinate[1].toString(),
    coordinate[0].toString(),
  ])
}

export const coordinatesFlipped = (
  coordinates: [number, number][]
): number[][] => {
  return coordinates.map((coordinate) => [coordinate[1], coordinate[0]])
}

export const toStrings = (elements: number[] | string[]): string[] => {
  return elements.map((element) => element.toString())
}

export const toStringArrays = (arrays: number[][]): string[][] => {
  return arrays.map((numbers) => numbers.map((num) => num.toString()))
}
