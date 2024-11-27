import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  radialGenerator,
  RadialArgs,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialPieElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data: RadialArgs[] = [
      { value: 15, color: { colorName: 'steelblue' } },
      { value: 45, color: { colorName: 'blue' } },
      { value: 60, color: { colorName: 'green' } },
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    radialGenerator.pie(canvas, data)
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
