import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, plottedPointGenerator } from 'd3qs/d3QuickStart'
import { CoordinateEnhanced } from 'd3qs/core/types'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedPointsElement: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: CoordinateEnhanced[] = [
      { x: 15, y: 10 },
      { x: 20, y: 30 },
      { x: 40, y: 26 },
      { x: 90, y: 15 },
      { x: 102, y: 112 },
      { x: 156, y: 140 },
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    plottedPointGenerator.points(canvas, data1)
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={targetId}></div>
    </>
  )
}
