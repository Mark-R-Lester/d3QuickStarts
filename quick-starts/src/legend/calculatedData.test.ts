import { getCalculatedData, CalculatedData } from './calculatedData'
import { getScales } from '../canvas/getScales'
import { mockSelection } from '../testObjects/mockSelection'
import { mockCanvasConfigStrict } from '../testObjects/mockCanvasConfigStrict'
import { LegendConfigStrict } from './types'
import { Canvas } from '../d3QuickStart'
import {
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextFont,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from '../core/enums/qsEnums'
import { QsLegendData } from './qsTypes'

const scales = getScales(mockCanvasConfigStrict)
const canvas: Canvas = {
  config: mockCanvasConfigStrict,
  displayGroup: mockSelection,
  scales,
}

const legendConfig: LegendConfigStrict = {
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
    x: 10,
    y: 80,
    textX: 23,
    textY: 90,
    width: 10,
    height: 10,
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
