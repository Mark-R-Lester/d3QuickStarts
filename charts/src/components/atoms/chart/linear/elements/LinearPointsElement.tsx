import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, linearPointGenerator } from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearPointsElement: FunctionComponent<OrienetedChartProps> = ({
  targetId,
  orientation,
}) => {
  const createChart = () => {
    const data1 = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    if (orientation === Orientation.VERTICAL) {
      linearPointGenerator.vertical(canvas, data1)
    } else {
      linearPointGenerator.horizontal(canvas, data1)
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
