import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsLegendData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const UnboundLegendDefaultsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsLegendData[] = [
        { value: 'Red', fillColor: 'red' },
        { value: 'Blue', fillColor: 'blue' },
        { value: 'Green', fillColor: 'green' },
        { value: 'Purple', fillColor: 'purple' },
      ]

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      canvas.generate.unbound.legend(data)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
