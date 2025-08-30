import { FunctionComponent, useEffect } from 'react'
import { QsCanvasPlotted, qsCreateCanvasPlotted } from 'd3qs/d3QuickStart'
import { PlottedPointsChartProps } from '../../../common/chartProps'

export const PlottedPointsChart: FunctionComponent<PlottedPointsChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { x: 15, y: 10 },
    { x: 20, y: 30 },
    { x: 40, y: 26 },
    { x: 90, y: 15 },
    { x: 102, y: 112 },
    { x: 156, y: 140 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)
      canvas.generate.plotted.points(data, config)
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom()
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
