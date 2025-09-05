import { QsOrdinalScaleData } from '../../core/types/qsTypes'
import {
  ConfigStrokeDefaults,
  ConfigTextDefaults,
  StrokeData,
  TextData,
} from '../../core/types/types'

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface CalculatedData extends StrokeData, TextData {
  [key: string]: string | RingData | number
  ringId: string
  textId: string
  ringData: RingData
  x: number
  y: number
}

export interface RadialAxisConfig
  extends ConfigStrokeDefaults,
    ConfigTextDefaults {
  [key: string]:
    | number
    | undefined
    | string
    | boolean
    | QsOrdinalScaleData
    | QsRingConfig[]
  useDataArea: boolean
  showCentralTick: boolean
  ringConfig?: QsRingConfig[]
  x: number
  y: number
  defaultAxisAngle: number
  defaultGap: number
  numberOfRings: number
  decimalPlaces?: number
}

export interface QsRingConfig extends Partial<StrokeData>, Partial<TextData> {
  [key: string]: number | undefined | string | boolean | QsOrdinalScaleData
  ringNumber: number
  axisAngle?: number
  gap?: number
  decimalPlaces?: number
}
