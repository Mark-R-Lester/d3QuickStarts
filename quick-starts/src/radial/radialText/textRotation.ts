import { RadialTextType } from '../../core/enums/enums'
import { BandData } from './meta'

export const getRotationFunction = (
  type: RadialTextType
): ((angles: BandData) => number) => {
  if (type === RadialTextType.SPOKE) {
    return (d: BandData): number => {
      let angle: number = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI) - 90
      return angle % 360
    }
  }

  if (type === RadialTextType.ROTATED) {
    return (d: BandData) => {
      let angle = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI)
      return angle % 360
    }
  }

  return (d: BandData) => {
    return 0
  }
}
