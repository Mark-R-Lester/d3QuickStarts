import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsRadialGenerator,
  QsRadialData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPieElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsRadialData[] = [
      { value: 15, color: 'steelblue' },
      { value: 45, color: 'blue' },
      { value: 60, color: 'green' },
      { value: 15, color: 'steelblue' },
      { value: 45, color: 'blue' },
      { value: 60, color: 'green' },
      { value: 15, color: 'steelblue' },
      { value: 45, color: 'blue' },
      { value: 60, color: 'green' },
      { value: 15, color: 'steelblue' },
      { value: 45, color: 'blue' },
      { value: 60, color: 'green' },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 60,
    })

    qsRadialGenerator.pie(canvas, data, {
      outerRadius: 90,
      innerRadius: 50,
    })
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
