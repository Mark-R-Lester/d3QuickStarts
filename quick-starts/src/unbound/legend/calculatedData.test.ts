import { getCalculatedData, CalculatedData } from './calculatedData'
import { getScales } from '../../core/canvas/getScales'
import { mockSelection } from '../../testObjects/mockSelection'
import { mockCanvasConfig } from '../../testObjects/mockCanvasConfig'
import { LegendConfig } from './types'
import {
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextFont,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from '../../core/enums/qsEnums'
import { QsLegendData } from './qsTypes'
import { ConfigStoreManager } from '../../core/config/configStore.class'
import { Canvas } from '../../core/canvas/canvas'

const scales = getScales(mockCanvasConfig)
const canvas: Canvas = {
  config: mockCanvasConfig,
  canvasGroup: mockSelection,
  canvasDataGroup: mockSelection,
  scales,
  configStore: new ConfigStoreManager().getters,
  elements: [],
}

const legendConfig: LegendConfig = {
  height: 10,
  width: 10,
  verticalSpacing: 6,
  relativeTextX: 6,
  relativeTextY: 0,
  x: 10,
  y: 10,
  defaultTextFontWeight: QsEnumTextFontWeight.NORMAL,
  defaultTextFontStyle: QsEnumTextFontStyle.NORMAL,
  defaultTextFontSize: 10,
  defaultTextFont: QsEnumTextFont.SERIF,
  defaultTextDecorationLine: QsEnumTextDecorationLine.NORMAL,
  defaultTextFill: 'black',
  defaultTextStroke: '',
  defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
  defaultTextAngle: 0,
}

const data: QsLegendData[] = [
  {
    value: 'description',
    fillColor: 'red',
  },
]

const calculatedDataResult: CalculatedData[] = [
  {
    x: 90,
    y: 890,
    textX: 96,
    textY: 895,
    width: 10,
    height: 10,
    fillColor: 'red',
    value: 'description',
    textFontSize: 10,
    textFont: QsEnumTextFont.SERIF,
    textFontStyle: QsEnumTextFontStyle.NORMAL,
    textFontWeight: QsEnumTextFontWeight.NORMAL,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: 'black',
    textAngle: 0,
    textStroke: '',
    textAnchor: QsEnumTextAnchor.MIDDLE,
    textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  },
]

describe('legend getCalculatedData', () => {
  test('to strings', () => {
    expect(getCalculatedData(canvas, data, legendConfig)).toEqual(
      calculatedDataResult
    )
  })
})
