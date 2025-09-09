import { degreesToRadians } from '../math/conversion'
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

/*
 * The function assumes 2 arcs equal and opposite each other
 * It then calculates the distance between them due to adding padding
 * Occasionally this generates a value slightly less than the actual distance
 * 0.1 is added ensuring elements are always drawn as desired
 */
export const calculateInnerRadius = (
  padding: number,
  startAngle: number,
  endAngle: number
): number => {
  const angle = (endAngle - startAngle) / 2
  const radius =
    angle > degreesToRadians(90)
      ? hypotenuseFromAdjacent({ adjacent: padding, radians: angle })
      : hypotenuseFromOpposite({ opposite: padding, radians: angle })
  return radius + 0.1
}
/**
 * This calculates an angle required such that:
 * given any radius the gap in the cirle when drawn
 * will always be the same no matter the radius
 */
export const calculateCentralAngle = (radius: number, gap: number): number => {
  const thetaHalf = Math.asin((gap / radius) * 2)
  const theta = 2 * thetaHalf
  return theta
}

export const adjustForParallelPadding = (
  args: ParalelPaddedArcArgs
): CustomArcArgs => {
  const { innerRadius, outerRadius, startAngle, endAngle, padding } = args
  let outInnerRadius: number = innerRadius
  if (innerRadius < padding)
    outInnerRadius = calculateInnerRadius(padding, startAngle, endAngle)

  const nintyDegrees = degreesToRadians(90)
  const outerPad = calculateCentralAngle(outerRadius, padding / 2) / 2
  const innerPad =
    outInnerRadius === 0
      ? 0
      : calculateCentralAngle(outInnerRadius, padding / 2) / 2

  const outerStartAngle = startAngle - nintyDegrees + outerPad
  const outerEndAngle = endAngle - nintyDegrees - outerPad
  const innerStartAngle = startAngle - nintyDegrees + innerPad
  const innerEndAngle = endAngle - nintyDegrees - innerPad

  const customArcArgs: CustomArcArgs = {
    innerRadius: outInnerRadius,
    outerRadius,
    outerStartAngle,
    outerEndAngle,
    innerStartAngle,
    innerEndAngle,
  }

  return customArcArgs
}

export const parallelPaddedArc = (args: ParalelPaddedArcArgs): string => {
  return customArc(adjustForParallelPadding(args))
}
