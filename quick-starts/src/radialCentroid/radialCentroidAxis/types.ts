import { QsOrdinalScaleData } from '../../core/types/qsTypes'
import {
  ConfigStrokeDefaults,
  ConfigTextDefaults,
  StrokeData,
  TextData,
} from '../../core/types/types'
import { QsEnumLayerType } from '../../core/enums/qsEnums'

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface CentroidAxisConfig
  extends ConfigStrokeDefaults,
    ConfigTextDefaults {
  [key: string]:
    | number
    | undefined
    | string
    | boolean
    | QsOrdinalScaleData
    | QsCentroidTickConfig[]
  layerType: QsEnumLayerType
  showCentralTick: boolean
  ringConfig?: QsCentroidTickConfig[]
  x: number
  y: number
  defaultAxisAngle: number
  defaultGap: number
  numberOfRings: number
  decimalPlaces?: number
}

export interface QsCentroidTickConfig
  extends Partial<StrokeData>,
    Partial<TextData> {
  [key: string]: number | undefined | string | boolean | QsOrdinalScaleData
  ringNumber: number
  axisAngle?: number
  gap?: number
  decimalPlaces?: number
}

export interface QsCalculatedDataCentroidAxis extends StrokeData, TextData {
  [key: string]: string | RingData | number
  ringId: string
  textId: string
  ringData: RingData
  x: number
  y: number
}
