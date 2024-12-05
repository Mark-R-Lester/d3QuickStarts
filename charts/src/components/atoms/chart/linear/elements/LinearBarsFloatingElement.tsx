import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarFloatingGenerator,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearFloatingBarsElement: FunctionComponent<
  OrienetedChartProps
> = ({ targetId, orientation }) => {
  const createChart = () => {
    const data2 = [
      [10, 30],
      [20, 40],
      [30, 50],
      [40, 60],
      [50, 70],
    ]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    if (orientation === Orientation.VERTICAL) {
      linearBarFloatingGenerator.vertical(canvas, data2)
    } else {
      linearBarFloatingGenerator.horizontal(canvas, data2)
    }
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
