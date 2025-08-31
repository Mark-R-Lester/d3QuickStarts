import { FunctionComponent, useEffect } from 'react'
import { QsCanvasPlotted, qsCreateCanvasPlotted } from 'd3qs/d3QuickStart'
import { PlottedTextChartProps } from '../../../common/chartProps'

export const PlottedTextChart: FunctionComponent<PlottedTextChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { x: 0, y: 0 },
    { x: 5, y: 10 },
    { x: 10, y: 5 },
    { x: 15, y: 30 },
    { x: 20, y: 15 },
    { x: 25, y: 20 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)

      canvas.generate.plotted.line({
        coordinates: [
          { x: 0, y: 0 },
          { x: 5, y: 10 },
          { x: 10, y: 5 },
          { x: 15, y: 30 },
          { x: 20, y: 15 },
          { x: 25, y: 20 },
        ],
      })
      canvas.generate.plotted.text(data, config)

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
