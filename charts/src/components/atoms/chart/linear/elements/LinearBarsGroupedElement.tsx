import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarGroupGenerator,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearBarsGroupedElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data = [
      [10, 20, 16, 23, 70],
      [16, 32, 30, 26],
      [40, 16, 12, 16],
      [10, 4, 13, 32],
      [10, 37, 21, 8],
      [10, 20, 16, 23],
      [10, 32, 30, 26],
      [15, 16, 12, 16],
      [10, 4, 13, 32],
      [19, 37, 21, 8],
      [15, 20, 16, 23],
      [11, 32, 30, 26],
      [10, 16, 12, 16],
      [6, 4, 13, 3],
    ]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })
    linearBarGroupGenerator.grouped(canvas, data)
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
