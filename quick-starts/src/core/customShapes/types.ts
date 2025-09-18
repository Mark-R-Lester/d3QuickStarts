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
  | { type: QsEnumShape.STAR; config: StarConfig }
  | { type: QsEnumShape.POLYGON; config: PolygonConfig }
  | { type: QsEnumShape.CIRCLE; config: CircleConfig }
  | { type: QsEnumShape.RECTANGLE; config: RectangleConfig }
