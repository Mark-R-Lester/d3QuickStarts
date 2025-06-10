import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPlottedPointData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedPointsDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPlottedPointData[] = [
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 40, y: 26 },
        { x: 90, y: 15 },
        { x: 102, y: 112 },
        { x: 156, y: 140 },
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
