import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarGroupGenerator,
} from 'd3qs/d3QuickStart'
import { GroupedChartProps } from '../../../../common/types/chartProps'
import { Grouping } from '../../../../../common/enums'

export const LinearBarsGroupedElement: FunctionComponent<GroupedChartProps> = ({
  targetId,
  grouping,
}) => {
  const createChart = () => {
    const data = [
      [10, 20, 16, 23],
      [16, 32, 30, 26],
      [40, 16, 12, 16],
      [10, 4, 13, 32],
      [10, 37, 21, 8],
      [10, 20, 16, 23],
      [10, 32, 30, 26],
      [15, 16, 12, 16],
      [10, 4, 13, 32],
    ]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })
    if (grouping === Grouping.GROUPED) {
      linearBarGroupGenerator.grouped(canvas, data)
    } else {
      linearBarGroupGenerator.stacked(canvas, data)
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
