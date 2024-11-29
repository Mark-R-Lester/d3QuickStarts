import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, linearAreaGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearAreaElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]
    const data2 = [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 205, 240]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    linearAreaGenerator
      .horizontal(canvas, { higherData: data1 }, { color: 'black' })
      .area.attr('fill', 'blue')
      .attr('fill-opacity', '0.5')
    linearAreaGenerator
      .horizontal(canvas, { higherData: data2, lowerData: data1 })
      .area.attr('fill', 'red')
      .attr('fill-opacity', '0.5')
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
