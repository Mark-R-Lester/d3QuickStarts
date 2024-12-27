import { getMeta, Meta } from './meta'
import { mockSelection } from '../testObjects/mockSelection'
import { mockCanvasConfigStrict } from '../testObjects/mockCanvasConfigStrict'
import { LegendConfigStrict, QsLegendData } from './types'
import { QsCanvas } from '../d3QuickStart'
import {
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextFont,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from '../core/enums/qsEnums'

const canvas: QsCanvas = {
  config: mockCanvasConfigStrict,
  displayGroup: mockSelection,
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
    color: 'red',
  },
]

const metaResult: Meta[] = [
  {
    x: 10,
    y: 80,
    textX: 23,
    textY: 90,
    width: 10,
    height: 10,
    color: 'red',
    value: 'description',
  },
]

describe('legend getMeta', () => {
  test('to strings', () => {
    expect(getMeta(canvas, data, legendConfig)).toEqual(metaResult)
  })
})
