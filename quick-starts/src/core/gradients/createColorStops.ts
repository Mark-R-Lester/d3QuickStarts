import { QsColorStop } from './gradients'

export const createColorStops = (colors: string[]): QsColorStop[] => {
  const stops: QsColorStop[] = colors.map((color: string, index: number) => ({
    color,
    offset: (index / (colors.length - 1)) * 100,
  }))
  return stops
}
