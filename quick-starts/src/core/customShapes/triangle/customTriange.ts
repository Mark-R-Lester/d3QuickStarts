import { QsBaseAnchor, QsHeightAnchor } from '../qsEnums'

export interface TriangleConfig {
  angle1?: number
  angle2?: number
  baseLength: number
  x: number
  y: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

interface SideLengthsConfig {
  baseLength: number
  rad1: number
  rad2: number
  rad3: number
}

interface CentroidConfig {
  x1: number
  x2: number
  x3: number
  y1: number
  y2: number
  y3: number
}

interface SvgPathConfig {
  p1: { x: number; y: number }
  p2: { x: number; y: number }
  p3: { x: number; y: number }
}

interface RotatePointConfig {
  px: number
  py: number
  cx: number
  cy: number
  radRot: number
}

const validateAngles = (angle1: number, angle2: number) => {
  const angle3 = 180 - angle1 - angle2
  if (angle1 <= 0 || angle2 <= 0 || angle3 <= 0) {
    throw new Error('Angles must be positive and sum to 180 degrees')
  }
  return angle3
}

const convertToRadians = (degrees: number) => (degrees * Math.PI) / 180

const calculateSideLengths = ({
  baseLength,
  rad1,
  rad2,
  rad3,
}: SideLengthsConfig) => ({
  side2: (baseLength * Math.sin(rad3)) / Math.sin(rad2),
  side3: (baseLength * Math.sin(rad1)) / Math.sin(rad3),
})

const positionBase = (
  baseX: number,
  baseLength: number,
  baseAnchor: QsBaseAnchor
) => {
  if (baseAnchor === QsBaseAnchor.START) {
    return { x1: baseX, x3: baseX + baseLength }
  } else if (baseAnchor === QsBaseAnchor.CENTER) {
    return { x1: baseX - baseLength / 2, x3: baseX + baseLength / 2 }
  }
  return { x1: baseX - baseLength, x3: baseX }
}

const positionHeight = (
  baseY: number,
  side2: number,
  rad1: number,
  heightAnchor: QsHeightAnchor
) => {
  const y2Relative = -side2 * Math.sin(rad1)
  if (heightAnchor === QsHeightAnchor.BOTTOM) {
    return { y1: baseY, y2: baseY + y2Relative, y3: baseY }
  } else if (heightAnchor === QsHeightAnchor.TOP) {
    return { y1: baseY - y2Relative, y2: baseY, y3: baseY - y2Relative }
  }
  const height = side2 * Math.sin(rad1)
  const centroidToBase = (height * 2) / 3
  const y1 = baseY + centroidToBase
  return { y1, y2: y1 + y2Relative, y3: y1 }
}

const calculateCentroid = ({ x1, x2, x3, y1, y2, y3 }: CentroidConfig) => ({
  cx: (x1 + x2 + x3) / 3,
  cy: (y1 + y2 + y3) / 3,
})

const rotatePoint = ({ px, py, cx, cy, radRot }: RotatePointConfig) => {
  const dx = px - cx
  const dy = py - cy
  const rotatedX = cx + dx * Math.cos(radRot) - dy * Math.sin(radRot)
  const rotatedY = cy + dx * Math.sin(radRot) + dy * Math.cos(radRot)
  return { x: rotatedX, y: rotatedY }
}

const generateSvgPath = ({ p1, p2, p3 }: SvgPathConfig) =>
  [`M${p1.x},${p1.y}`, `L${p2.x},${p2.y}`, `L${p3.x},${p3.y}`, 'Z'].join(' ')

export const customTriangle = ({
  angle1 = 60,
  angle2 = 60,
  baseLength,
  x,
  y,
  baseAnchor = QsBaseAnchor.START,
  heightAnchor = QsHeightAnchor.BOTTOM,
  rotationAngle = 0,
}: TriangleConfig): string => {
  const angle3 = validateAngles(angle1, angle2)

  const rad1 = convertToRadians(angle1)
  const rad2 = convertToRadians(angle2)
  const rad3 = convertToRadians(angle3)

  const { side2 } = calculateSideLengths({ baseLength, rad1, rad2, rad3 })

  const { x1, x3 } = positionBase(x, baseLength, baseAnchor)
  const x2 = x1 + side2 * Math.cos(rad1)

  const { y1, y2, y3 } = positionHeight(y, side2, rad1, heightAnchor)

  const { cx, cy } = calculateCentroid({ x1, x2, x3, y1, y2, y3 })
  const radRot = convertToRadians(rotationAngle)

  const p1 = rotatePoint({ px: x1, py: y1, cx, cy, radRot })
  const p2 = rotatePoint({ px: x2, py: y2, cx, cy, radRot })
  const p3 = rotatePoint({ px: x3, py: y3, cx, cy, radRot })

  return generateSvgPath({ p1, p2, p3 })
}
