import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, radialAxisGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialAxisElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: number[] = [5, 10, 15, 50]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    radialAxisGenerator.rings(canvas, data1)
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
