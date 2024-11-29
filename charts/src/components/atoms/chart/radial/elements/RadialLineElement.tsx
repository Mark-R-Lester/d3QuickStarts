import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, radialLineGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialLineElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data: number[] = [
      16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
      20, 17, 23, 23, 20, 17, 16, 16,
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 23,
    })

    radialLineGenerator.line(canvas, data)
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
