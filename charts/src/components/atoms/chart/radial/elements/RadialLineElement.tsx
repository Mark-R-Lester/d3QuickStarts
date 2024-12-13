import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsRadialLineGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialLineElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: number[] = [
      16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
      20, 17, 23, 23, 20, 17, 16, 16,
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 23,
    })

    qsRadialLineGenerator.line(canvas, data)
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
