import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'
import { UnboundLegendChartProps } from '../../../common/chartProps'

export const UnboundLegendChart: FunctionComponent<UnboundLegendChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { value: 'Red', fillColor: 'red' },
    { value: 'Blue', fillColor: 'blue' },
    { value: 'Green', fillColor: 'green' },
    { value: 'Purple', fillColor: 'purple' },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      canvas.generate.unbound.legend(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
