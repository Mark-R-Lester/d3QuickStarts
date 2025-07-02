import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsValuedText,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialTextConfigChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsValuedText[] = [
        { value: 10, text: 'Ten' },
        { value: 20, text: 'Twenty' },
        { value: 30, text: 'Thirty' },
        { value: 40, text: 'Forty' },
        { value: 50, text: 'Fifty' },
      ]

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.radialArc.text.follow(data, {
        radius: 100,
        x: 50,
        y: 50,
        textFont: QsEnumTextFont.ARIAL,
        textFontSize: 6,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textDecorationLine: QsEnumTextDecorationLine.OVERLINE_UNDERLINE,
        textFill: 'orange',
        textStroke: 'purple',
        textAnchor: QsEnumTextAnchor.MIDDLE,
        scaleType: QsEnumScaleType.BANDED,
      })
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
