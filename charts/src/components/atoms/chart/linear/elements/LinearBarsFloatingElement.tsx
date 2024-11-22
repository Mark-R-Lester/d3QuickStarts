import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, barFloatingGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearFloatingBarsElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data2 = [
      [10, 30],
      [20, 40],
      [30, 50],
      [40, 60],
      [50, 70],
    ]
    const canvasFV: Canvas = createCanvas(targetId, {
      width: 600,
    })

    barFloatingGenerator.horizontal(canvasFV, data2)
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
