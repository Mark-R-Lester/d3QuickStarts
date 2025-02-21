import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPlottedPointData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedPointsElement: FunctionComponent<ChartProps> = ({
  chartName,
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

      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      })

      canvas.generate.plotted.points(data)
    }
    createChart()
  }, [chartName])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
