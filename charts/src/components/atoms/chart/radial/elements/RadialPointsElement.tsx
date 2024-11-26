import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, radialPointGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialPointsElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data: number[] = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      min: 0,
      max: 3,
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
