import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, createCanvas, plottedLineGenerator } from 'd3qs/d3QuickStart'
import { Coordinate } from 'd3qs/core/types'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedLineElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1: Coordinate[] = [
      { x: 15, y: 10 },
      { x: 20, y: 30 },
      { x: 40, y: 26 },
      { x: 90, y: 15 },
      { x: 102, y: 112 },
      { x: 156, y: 140 },
    ]

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 156,
    })

    plottedLineGenerator.line(canvas, data1)
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
