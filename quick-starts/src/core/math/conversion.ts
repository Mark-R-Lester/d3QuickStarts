export const toStrings = (elements: number[] | string[]): string[] => {
  return elements.map((element) => element.toString())
}

export const degreesToRadians = (degrees: number): number =>
  degrees * (Math.PI / 180)

export const radiansToDegrees = (radians: number): number =>
  radians * (180 / Math.PI)
