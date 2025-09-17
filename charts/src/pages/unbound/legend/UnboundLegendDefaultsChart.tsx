import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsLegendData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOrthogonal } from '../../../common/chartProps'

export const UnboundLegendDefaultsChart: FunctionComponent<
  ChartPropsOrthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsLegendData[] = [
        { value: 'Red', fillColor: 'red' },
        { value: 'Blue', fillColor: 'blue' },
        { value: 'Green', fillColor: 'green' },
        { value: 'Purple', fillColor: 'purple' },
      ]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      canvas.generate.unbound.legend(data)
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
