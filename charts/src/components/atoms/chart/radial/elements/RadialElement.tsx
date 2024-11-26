import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  radialGenerator,
  RadialArgs,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialElement: FunctionComponent<chartProps> = ({ targetId }) => {
  const createChart = () => {
    // const data1: RadialArgs[] = [
    //   { value: 15, color: 'blue' },
    //   { value: 45, color: 'red' },
    //   { value: 60, color: 'yellow' },
    // ]

    const data1: RadialArgs[] = [{ value: 15 }, { value: 45 }, { value: 60 }]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    radialGenerator.pie(canvas, data1)
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
