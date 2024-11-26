import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  RadialAreaArgs,
  radialAreaGenerator,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialAreaElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: RadialAreaArgs = {
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
      min: 0,
      max: 25,
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
