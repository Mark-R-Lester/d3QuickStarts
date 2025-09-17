import { QsBaseAnchor, QsHeightAnchor } from '../qsEnums'

export interface PolygonConfig {
  sides: number
  radius: number
  x: number
  y: number
  baseAnchor?: QsBaseAnchor
  heightAnchor?: QsHeightAnchor
  rotationAngle?: number
}

interface GenerateVerticesConfig {
  sides: number
  radius: number
  centerX: number
  centerY: number
}

interface SvgPathConfig {
  vertices: { x: number; y: number }[]
}

const validatePolygon = (sides: number, radius: number) => {
  if (sides < 3) {
    throw new Error('Polygon must have at least 3 sides')
  }
  if (radius <= 0) {
    throw new Error('Radius must be positive')
  }
}

const convertToRadians = (degrees: number) => (degrees * Math.PI) / 180

const positionPolygon = (
  baseX: number,
  baseY: number,
  radius: number,
  baseAnchor: QsBaseAnchor,
  heightAnchor: QsHeightAnchor
) => {
  let centerX = baseX
  if (baseAnchor === QsBaseAnchor.START) {
    centerX = baseX + radius
  } else if (baseAnchor === QsBaseAnchor.END) {
    centerX = baseX - radius
  }

  let centerY = baseY
  if (heightAnchor === QsHeightAnchor.TOP) {
    centerY = baseY + radius
  } else if (heightAnchor === QsHeightAnchor.BOTTOM) {
    centerY = baseY - radius
  }

  return { centerX, centerY }
}

const generateVertices = ({
  sides,
  radius,
  centerX,
  centerY,
}: GenerateVerticesConfig) => {
  const vertices: { x: number; y: number }[] = []
  const angleStep = 360 / sides

  for (let i = 0; i < sides; i++) {
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

export const customPolygon = ({
  sides,
  radius,
  x,
  y,
  baseAnchor = QsBaseAnchor.CENTER,
  heightAnchor = QsHeightAnchor.MIDDLE,
  rotationAngle = 0,
}: PolygonConfig): string => {
  validatePolygon(sides, radius)

  const { centerX, centerY } = positionPolygon(
    x,
    y,
    radius,
    baseAnchor,
    heightAnchor
  )

  const vertices = generateVertices({ sides, radius, centerX, centerY })

  const radRot = convertToRadians(rotationAngle)
  const rotatedVertices = vertices.map((v) =>
    rotatePoint({ px: v.x, py: v.y, cx: centerX, cy: centerY, radRot })
  )

  return generateSvgPath({ vertices: rotatedVertices })
}
