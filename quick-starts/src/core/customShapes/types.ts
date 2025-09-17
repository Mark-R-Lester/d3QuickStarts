import { PolygonConfig } from './polygon/customPolygon'
import { QsEnumShape } from './qsEnums'
import { RectangleConfig } from './rectangle/customRectangle'
import { StarConfig } from './star/customStar'

export interface CircleConfig {
  radius: number
  x: number
  y: number
}

export type Shape =
  | { shape: QsEnumShape.STAR; config: StarConfig }
  | { shape: QsEnumShape.POLYGON; config: PolygonConfig }
  | { shape: QsEnumShape.CIRCLE; config: CircleConfig }
  | { shape: QsEnumShape.RECTANGLE; config: RectangleConfig }
