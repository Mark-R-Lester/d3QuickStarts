import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarFloatingGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/types/chartProps'

export const LinearFloatingBarsElement: FunctionComponent<ChartProps> = ({
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

    linearBarFloatingGenerator.horizontal(canvasFV, data2)
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
