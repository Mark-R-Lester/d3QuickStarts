import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsArcTextData,
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontStyle,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialTextSpokeElement: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsArcTextData[] = [
        { value: 10, text: 'Ten' },
        { value: 20, text: 'Twenty' },
        { value: 30, text: 'Thirty' },
        { value: 40, text: 'Forty' },
        { value: 50, text: 'Fifty' },
      ]

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.generate.radialArc.text.spokes(data, {
        radius: 100,
        x: 50,
        y: 50,
        textFont: QsEnumTextFont.IMPACT,
        textFontSize: 6,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textFill: 'blue',
        textAnchor: QsEnumTextAnchor.MIDDLE,
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
