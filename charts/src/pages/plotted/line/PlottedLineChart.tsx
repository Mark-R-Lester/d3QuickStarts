import { FunctionComponent, useEffect } from 'react'
import { qsCreateCanvasPlotted, QsCanvasPlotted } from 'd3qs/d3QuickStart'
import { PlottedLineChartProps } from '../../../common/chartProps'

export const PlottedLineChart: FunctionComponent<PlottedLineChartProps> = ({
  canvasConfig,
  config = {},
  data = {
    coordinates: [
      { x: 0, y: 0 },
      { x: 20, y: 30 },
      { x: 40, y: 26 },
      { x: 90, y: 15 },
      { x: 102, y: 112 },
      { x: 156, y: 140 },
    ],
  },
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)

      canvas.generate.plotted.line(data, config)
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
