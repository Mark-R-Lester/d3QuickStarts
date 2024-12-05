import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, radialSpokesGenerator } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialSpokesElement: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    const numberOfSpokes = 6
    radialSpokesGenerator.spokes(canvas, numberOfSpokes)
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
