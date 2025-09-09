import * as d3 from 'd3'
import { QsCoordinate } from '../types/qsTypes'

export interface CustomArcArgs {
  outerRadius: number
  innerRadius: number
  outerStartAngle: number
  outerEndAngle: number
  innerStartAngle: number
  innerEndAngle: number
}

export const customArc = (args: CustomArcArgs): string => {
  const {
    innerRadius,
    outerRadius,
    outerStartAngle,
    outerEndAngle,
    innerStartAngle,
    innerEndAngle,
  } = args

  const path = d3.path()

  const outerStart: QsCoordinate = {
    x: outerRadius * Math.cos(outerStartAngle),
    y: outerRadius * Math.sin(outerStartAngle),
  }
  const innerEnd: QsCoordinate = {
    x: innerRadius * Math.cos(innerEndAngle),
    y: innerRadius * Math.sin(innerEndAngle),
  }

  path.moveTo(outerStart.x, outerStart.y)
  path.arc(0, 0, outerRadius, outerStartAngle, outerEndAngle)
  path.lineTo(innerEnd.x, innerEnd.y)
  path.arc(0, 0, innerRadius, innerEndAngle, innerStartAngle, true)
  path.lineTo(outerStart.x, outerStart.y)
  path.closePath()

  console.log(path)

  return path.toString()
}
