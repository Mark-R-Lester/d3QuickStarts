import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsScaleType,
} from '../../core/enums/qsEnums'
import { QsTransitionArgs } from '../../d3QuickStart'
import { Selection } from 'd3'

export interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}

export interface QsLineConfig {
  [key: string]: QsEnumCurve | number | string | undefined
  scaleType?: QsScaleType
  curve?: QsEnumCurve
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}

export interface QsLineTransitionData {
  data: QsLineData
  transitionArgs?: QsTransitionArgs
}

export interface QsLine {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsLineTransitionData) => void
}
