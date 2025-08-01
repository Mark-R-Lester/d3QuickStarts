import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsValuedText,
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialTextHorizontalElement: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsValuedText[] = [
        { value: 10, text: 'Ten' },
        { value: 20, text: 'Twenty' },
        { value: 30, text: 'Thirty' },
        { value: 40, text: 'Forty' },
        { value: 50, text: 'Fifty' },
      ]

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasProps)

      canvas.generate.radialArc.text.horizontal(data, {
        radius: 100,
        x: 50,
        y: 50,
        textFont: QsEnumTextFont.COMIC_SANS_MS,
        textFontSize: 6,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textFill: 'black',
        textAnchor: QsEnumTextAnchor.MIDDLE,
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
