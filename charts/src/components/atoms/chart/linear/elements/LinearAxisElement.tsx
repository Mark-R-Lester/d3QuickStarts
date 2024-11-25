import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, linearAxisGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearAxisElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })
    linearAxisGenerator.xAxisBottomBanded(canvas, data1)
    linearAxisGenerator.yAxisLeft(canvas, data2)
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
