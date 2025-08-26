import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasPlotted,
  QsPlottedPointsData,
  qsCreateCanvasPlotted,
} from 'd3qs/d3QuickStart'
import { ChartPropsPlotted } from '../../../common/chartProps'

export const PlottedPointsChart: FunctionComponent<ChartPropsPlotted> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPlottedPointsData[] = [
        {
          x: 15,
          y: 10,
          radius: 10,
          fillOpacity: 0.1,
        },
        { x: 20, y: 30, radius: 5, fillOpacity: 0.1 },
        { x: 40, y: 26, radius: 30, fillOpacity: 0.1 },
        { x: 90, y: 15, radius: 20, fillOpacity: 0.1 },
        {
          x: 102,
          y: 112,
          radius: 30,
          fillOpacity: 0.1,
          fillColor: 'red',
          strokeWidth: 1,
          strokeColor: 'blue',
        },
        { x: 156, y: 140, radius: 15, fillOpacity: 0.1 },
      ]

      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasConfig)
      canvas.generate.plotted.points(data)
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom()
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
