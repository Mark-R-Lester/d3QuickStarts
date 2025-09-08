import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadialTextData,
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialTextRotatedElement: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialTextData[] = [
        { value: 10, text: 'Ten' },
        { value: 20, text: 'Twenty' },
        { value: 30, text: 'Thirty' },
        { value: 40, text: 'Forty' },
        { value: 50, text: 'Fifty' },
      ]

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.generate.radialArc.text.rotated(data, {
        radius: 115,
        x: 50,
        y: 50,
        textFont: QsEnumTextFont.ARIAL,
        textFontSize: 10,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textAnchor: QsEnumTextAnchor.MIDDLE,
        textFill: 'orange',
        textStroke: 'blue',
      })
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
