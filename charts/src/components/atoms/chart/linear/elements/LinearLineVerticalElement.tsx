import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, linearLineGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearLineVerticalElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1 = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })
    linearLineGenerator.vertical(canvas, data1)
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
