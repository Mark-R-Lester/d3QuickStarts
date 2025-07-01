import {
  hypotenuseFromAdjacent,
  hypotenuseFromOpposite,
} from '../math/trigonometricFunctions'
import { CustomArcArgs, customArc } from './customArc'

export interface ParalelPaddedArcArgs {
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

export const parallelPaddedArc = (args: ParalelPaddedArcArgs): string => {
  const { innerRadius, outerRadius, startAngle, endAngle, padding } = args
  let outInnerRadius: number = innerRadius
  if (innerRadius < padding)
    outInnerRadius = calculateInnerRadius(padding, startAngle, endAngle)

  const nintyDegrees = degreesToRadians(90)
  const outerPad =
    degreesToRadians(calculateCentralAngle(outerRadius, padding / 2)) / 2
  const innerPad =
    degreesToRadians(calculateCentralAngle(outInnerRadius, padding / 2)) / 2

  const outerStartAngle = startAngle - nintyDegrees + outerPad
  const outerEndAngle = endAngle - nintyDegrees - outerPad
  const innerStartAngle = startAngle - nintyDegrees + innerPad
  const innerEndAngle = endAngle - nintyDegrees - innerPad

  const out: CustomArcArgs = {
    innerRadius: outInnerRadius,
    outerRadius,
    outerStartAngle,
    outerEndAngle,
    innerStartAngle,
    innerEndAngle,
  }
  return customArc(out)
}
