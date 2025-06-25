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
  displayGroup: mockSelection,
  scales,
  configStore: new ConfigStoreManager().getters,
  elements: [],
}

const legendConfig: LegendConfig = {
  ry: 0,
  rx: 0,
  height: 10,
  width: 10,
  space: 5,
  x: 10,
  y: 10,
  textFontWeight: QsEnumTextFontWeight.NORMAL,
  textFontStyle: QsEnumTextFontStyle.NORMAL,
  textFontSize: 10,
  textFont: QsEnumTextFont.SERIF,
  textDecorationLine: QsEnumTextDecorationLine.NORMAL,
  textFill: '',
  textStroke: '',
  textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  textAngle: 0,
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
    y: 790,
    textX: 220.00000000000003,
    textY: 890,
    width: 890,
    height: 890,
    fillColor: 'red',
    value: 'description',
    textFontSize: 10,
  },
]

describe('legend getCalculatedData', () => {
  test('to strings', () => {
    expect(getCalculatedData(canvas, data, legendConfig)).toEqual(
      calculatedDataResult
    )
  })
})
