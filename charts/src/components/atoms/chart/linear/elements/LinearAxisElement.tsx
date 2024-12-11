import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  qsLinearAxisGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const LinearAxisElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })
    qsLinearAxisGenerator.xAxisBottomBanded(canvas, data1)
    qsLinearAxisGenerator.yAxisLeft(canvas, data2)
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
