import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  QsPlottedPointsData,
  qsCreateCanvas,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedPointsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
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

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.plotted.points(data)
      canvas.generate.linear.vertical.axis.left([])
      canvas.generate.linear.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
