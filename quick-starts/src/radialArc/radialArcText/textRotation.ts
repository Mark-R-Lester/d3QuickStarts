import { RadialTextType } from '../../core/enums/enums'
import { TextArcData } from './calculatedData'

export const getRotationFunction = (
  type: RadialTextType
): ((angles: TextArcData) => number) => {
  if (type === RadialTextType.SPOKE) {
    return (d: TextArcData): number => {
      let angle: number = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI) - 90
      return angle % 360
    }
  }

  if (type === RadialTextType.ROTATED) {
    return (d: TextArcData) => {
      let angle = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI)
      return angle % 360
    }
  }

  return (d: TextArcData) => {
    return 0
  }
}
