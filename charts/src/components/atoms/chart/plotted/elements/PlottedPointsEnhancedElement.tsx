import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, QsPlottedPointData, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedPointsEnhancedElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPlottedPointData[] = [
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
