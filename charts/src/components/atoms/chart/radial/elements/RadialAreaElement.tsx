import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  QsRadialAreaArgs,
  radialAreaGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialAreaElement: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: QsRadialAreaArgs = {
      dataInner: [
        15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15, 15,
        17, 16, 21, 14, 15, 16, 12, 15,
      ],
      dataOuter: [
        16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
        20, 17, 23, 23, 20, 17, 16, 16,
      ],
    }

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 25,
    })

    radialAreaGenerator.area(canvas, data1)
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
