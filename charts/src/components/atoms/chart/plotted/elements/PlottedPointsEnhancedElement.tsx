import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, plottedPointGenerator } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/types/chartProps'
import { CoordinateEnhanced } from 'd3qs/core/types'

export const PlottedPointsEnhancedElement: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: CoordinateEnhanced[] = [
      { x: 15, y: 10, radius: 10, opacity: 10 },
      { x: 20, y: 30, radius: 50, opacity: 10 },
      { x: 40, y: 26, radius: 30, opacity: 10 },
      { x: 90, y: 15, radius: 100, opacity: 30 },
      { x: 102, y: 112, radius: 30, opacity: 10 },
      { x: 156, y: 140, radius: 15, opacity: 10 },
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
