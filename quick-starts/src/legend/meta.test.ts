import { getMeta, Meta } from './meta'
import { QsCanvas } from '../canvas/canvas'
import { mockSelection } from '../testObjects/mockSelection'
import { mockCanvasConfigStrict } from '../testObjects/mockCanvasConfigStrict'
import { LegendConfigStrict, QsValuedColor } from './types'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from '../core/qsEnums'

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

const data: QsValuedColor[] = [
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
    colour: 'red',
    value: 'description',
  },
]

describe('legend getMeta', () => {
  test('to strings', () => {
    expect(getMeta(canvas, data, legendConfig)).toEqual(metaResult)
  })
})
