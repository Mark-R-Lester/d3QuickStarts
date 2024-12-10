import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, createCanvas, linearBarGenerator } from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const isVertical = orientation === Orientation.VERTICAL

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: Math.max(...data),
    })

    if (isVertical) {
      linearBarGenerator.vertical(canvas, data)
    } else {
      linearBarGenerator.horizontal(canvas, data)
    }
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
