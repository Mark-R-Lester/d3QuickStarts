import { getMeta, Meta } from './meta'
import { QsCanvas } from '../canvas/canvas'
import { mockSelection } from '../testObjects/mockSelection'
import { mockCanvasConfigStrict } from '../testObjects/mockCanvasConfigStrict'
import { LegendConfigStrict, QsValuedColor } from './types'
import { QsEnumAlignmentBaseline, QsEnumTextAnchor } from '../core/qsEnums'

const canvas: QsCanvas = {
  config: mockCanvasConfigStrict,
  displayGroup: mockSelection,
}

const legendConfig: LegendConfigStrict = {
  height: 10,
  width: 10,
  space: 0,
  x: 10,
  y: 10,
  fontSize: 10,

  font: '',
  fill: '',
  stroke: '',
  alignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
  textAnchor: QsEnumTextAnchor.MIDDLE,
  angle: 0,
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
    tx: 23,
    ty: 90,
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
