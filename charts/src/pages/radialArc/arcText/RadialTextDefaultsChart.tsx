import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsValuedText,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialTextDefaultsChart: FunctionComponent<
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

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      canvas.generate.radialArc.text.follow(data)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
