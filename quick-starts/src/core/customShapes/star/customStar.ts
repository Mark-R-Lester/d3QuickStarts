import { QsBaseAnchor, QsHeightAnchor } from '../qsEnums'

export interface StarConfig {
  points: number
  outerRadius: number
  innerRadius?: number
  x: number
  y: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

interface GenerateVerticesConfig {
  points: number
  outerRadius: number
  innerRadius: number
  centerX: number
  centerY: number
}

interface SvgPathConfig {
  vertices: { x: number; y: number }[]
}

const validateStar = (
  points: number,
  outerRadius: number,
  innerRadius: number
) => {
  if (points < 3) {
    throw new Error('Star must have at least 3 points')
  }
  if (outerRadius <= 0) {
    throw new Error('Outer radius must be positive')
  }
  if (innerRadius < 0 || innerRadius > outerRadius) {
    throw new Error(
      'Inner radius must be non-negative and not exceed outer radius'
    )
  }
}

const convertToRadians = (degrees: number) => (degrees * Math.PI) / 180

const positionStar = (
  baseX: number,
  baseY: number,
  outerRadius: number,
  baseAnchor: QsBaseAnchor,
  heightAnchor: QsHeightAnchor
) => {
  let centerX = baseX
  if (baseAnchor === QsBaseAnchor.START) {
    centerX = baseX + outerRadius
  } else if (baseAnchor === QsBaseAnchor.END) {
    centerX = baseX - outerRadius
  }

  let centerY = baseY
  if (heightAnchor === QsHeightAnchor.TOP) {
    centerY = baseY + outerRadius
  } else if (heightAnchor === QsHeightAnchor.BOTTOM) {
    centerY = baseY - outerRadius
  }

  return { centerX, centerY }
}

const generateVertices = ({
  points,
  outerRadius,
  innerRadius,
  centerX,
  centerY,
}: GenerateVerticesConfig) => {
  const vertices: { x: number; y: number }[] = []
  const angleStep = 360 / (2 * points)

  for (let i = 0; i < 2 * points; i++) {
    const isOuter = i % 2 === 0
    const radius = isOuter ? outerRadius : innerRadius
    const angleDeg = i * angleStep
    const angleRad = convertToRadians(angleDeg)
    const x = centerX + radius * Math.sin(angleRad)
    const y = centerY - radius * Math.cos(angleRad)
    vertices.push({ x, y })
  }

  return vertices
}

const rotatePoint = ({
  px,
  py,
  cx,
  cy,
  radRot,
}: {
  px: number
  py: number
  cx: number
  cy: number
  radRot: number
}) => {
  const dx = px - cx
  const dy = py - cy
  const rotatedX = cx + dx * Math.cos(radRot) - dy * Math.sin(radRot)
  const rotatedY = cy + dx * Math.sin(radRot) + dy * Math.cos(radRot)
  return { x: rotatedX, y: rotatedY }
}

const generateSvgPath = ({ vertices }: SvgPathConfig) => {
  const path = vertices.map((v, i) =>
    i === 0 ? `M${v.x},${v.y}` : `L${v.x},${v.y}`
  )
  path.push('Z')
  return path.join(' ')
}

export const customStar = ({
  points,
  outerRadius,
  innerRadius = outerRadius / 2,
  x,
  y,
  baseAnchor = QsBaseAnchor.CENTER,
  heightAnchor = QsHeightAnchor.MIDDLE,
  rotationAngle = 0,
}: StarConfig): string => {
  validateStar(points, outerRadius, innerRadius)

  const { centerX, centerY } = positionStar(
    x,
    y,
    outerRadius,
    baseAnchor,
    heightAnchor
  )

  const vertices = generateVertices({
    points,
    outerRadius,
    innerRadius,
    centerX,
    centerY,
  })

  const radRot = convertToRadians(rotationAngle)
  const rotatedVertices = vertices.map((v) =>
    rotatePoint({ px: v.x, py: v.y, cx: centerX, cy: centerY, radRot })
  )

  return generateSvgPath({ vertices: rotatedVertices })
}
