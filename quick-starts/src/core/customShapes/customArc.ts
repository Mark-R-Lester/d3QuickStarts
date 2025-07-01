import * as d3 from 'd3'
import { QsCoordinate } from '../types/qsTypes'
import {
  hypotenuseFromAdjacent,
  hypotenuseFromOpposite,
} from '../math/trigonometricFunctions'

export interface CustomArcArgs {
  outerRadius: number
  innerRadius: number
  startAngle: number
  endAngle: number
  padding: number
}

const degreesToRadians = (degrees: number): number => degrees * (Math.PI / 180)
const radiansToDegrees = (radians: number): number => radians * (180 / Math.PI)

/*
 * The function assumes 2 arcs equal and opposite each other
 * It then calculates the distance between them due to adding padding
 * Occasionally this generates a value slightly less than the actual distance
 * 0.1 is added ensuring elements are always drawn as desired
 */
const calculateInnerRadius = (
  padding: number,
  startAngle: number,
  endAngle: number
): number => {
  const angle = (endAngle - startAngle) / 2
  const radius =
    angle > degreesToRadians(90)
      ? hypotenuseFromAdjacent({ adjacent: padding, angle })
      : hypotenuseFromOpposite({ opposite: padding, angle })
  return radius + 0.1
}

const calculateCentralAngle = (radius: number, gap: number): number => {
  const thetaHalf = Math.asin((gap / radius) * 2)
  const theta = 2 * thetaHalf
  const thetaDegrees = theta * (180 / Math.PI)
  return Number(thetaDegrees.toFixed(2))
}

export const customArc = (args: CustomArcArgs): string => {
  console.log('args', args)
  const { outerRadius, startAngle, endAngle, padding } = args
  let { innerRadius } = args
  const nintyDegrees = degreesToRadians(90)

  if (innerRadius < padding) {
    innerRadius = calculateInnerRadius(padding, startAngle, endAngle)
  }

  const outerPad =
    degreesToRadians(calculateCentralAngle(outerRadius, padding / 2)) / 2
  const innerPad =
    degreesToRadians(calculateCentralAngle(innerRadius, padding / 2)) / 2

  const outerStartAngle = startAngle - nintyDegrees + outerPad
  const outerEndAngle = endAngle - nintyDegrees - outerPad
  const innerStartAngle = startAngle - nintyDegrees + innerPad
  const innerEndAngle = endAngle - nintyDegrees - innerPad
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

  return path.toString()
}
