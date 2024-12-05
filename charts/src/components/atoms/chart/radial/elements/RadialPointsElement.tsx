import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, radialPointGenerator } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPointsElement: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data: number[] = [
      1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2,
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 3,
    })

    radialPointGenerator.points(canvas, data)
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
