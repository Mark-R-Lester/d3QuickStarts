import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  QsCoordinateEnhanced,
  qsCreateCanvas,
  qsPlottedPointGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedPointsEnhancedElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1: QsCoordinateEnhanced[] = [
      { x: 15, y: 10, radius: 10, opacity: 10 },
      { x: 20, y: 30, radius: 50, opacity: 10 },
      { x: 40, y: 26, radius: 30, opacity: 10 },
      { x: 90, y: 15, radius: 100, opacity: 30 },
      { x: 102, y: 112, radius: 30, opacity: 10 },
      { x: 156, y: 140, radius: 15, opacity: 10 },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 156,
    })

    qsPlottedPointGenerator.points(canvas, data1)
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
