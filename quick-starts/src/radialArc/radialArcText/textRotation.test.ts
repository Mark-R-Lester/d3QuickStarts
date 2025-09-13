import { RadialTextType } from '../../core/enums/enums'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFontStyle,
} from '../../core/enums/qsEnums'
import { getRotationFunction } from './textRotation'
import { TextArcData } from './types'

describe('color functions', () => {
  const bandData: TextArcData = {
    textId: '',
    arcId: '',
    newData: {
      value: 0,
      decimalPoints: 0,
    },
    data: {
      value: 0,
      decimalPoints: 0,
    },
    index: 0,
    value: 0,
    newStartAngle: 0,
    startAngle: 0,
    newEndAngle: 0,
    endAngle: 0,
    outerRadius: 0,
    innerRadius: 0,
    decimalPoints: 0,
    textFont: '',
    textFontSize: 0,
    textFontStyle: QsEnumTextFontStyle.OBLIQUE,
    textFontWeight: 0,
    textDecorationLine: QsEnumTextDecorationLine.NORMAL,
    textFill: '',
    textAnchor: QsEnumTextAnchor.START,
    textStroke: '',
    textAlignmentBaseline: QsEnumAlignmentBaseline.AUTO,
  }
  describe('getPrecidendedColor', () => {
    test.each`
      startAngle | endAngle | radialTextType               | expectedAngle
      ${0}       | ${0}     | ${RadialTextType.HORIZONTAL} | ${0}
      ${0}       | ${90}    | ${RadialTextType.HORIZONTAL} | ${0}
      ${0}       | ${180}   | ${RadialTextType.HORIZONTAL} | ${0}
      ${0}       | ${270}   | ${RadialTextType.HORIZONTAL} | ${0}
      ${0}       | ${0}     | ${RadialTextType.SPOKE}      | ${-90}
      ${0}       | ${90}    | ${RadialTextType.SPOKE}      | ${328.31007808870436}
      ${0}       | ${180}   | ${RadialTextType.SPOKE}      | ${26.620156177408717}
      ${0}       | ${270}   | ${RadialTextType.SPOKE}      | ${84.93023426611398}
      ${90}      | ${180}   | ${RadialTextType.SPOKE}      | ${84.93023426611398}
      ${90}      | ${270}   | ${RadialTextType.SPOKE}      | ${143.24031235481743}
      ${0}       | ${0}     | ${RadialTextType.ROTATED}    | ${0}
      ${0}       | ${90}    | ${RadialTextType.ROTATED}    | ${58.31007808870436}
      ${0}       | ${180}   | ${RadialTextType.ROTATED}    | ${116.62015617740872}
      ${0}       | ${270}   | ${RadialTextType.ROTATED}    | ${174.93023426611398}
      ${90}      | ${180}   | ${RadialTextType.ROTATED}    | ${174.93023426611398}
      ${90}      | ${270}   | ${RadialTextType.ROTATED}    | ${233.24031235481743}
    `(
      'When the radialTextType is $radialTextType, the startAngle is $startAngle and endAngle is $endAngle the result should be $expectedAngle',
      ({ startAngle, endAngle, radialTextType, expectedAngle }) => {
        bandData.endAngle = endAngle
        bandData.startAngle = startAngle
        const rotate = getRotationFunction(radialTextType)
        expect(rotate(bandData)).toEqual(expectedAngle)
      }
    )
  })
})
