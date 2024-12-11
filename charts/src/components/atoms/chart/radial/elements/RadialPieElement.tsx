import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  qsRadialGenerator,
  QsRadialArgs,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPieElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsRadialArgs[] = [
      { value: 15, color: { colorName: 'steelblue' } },
      { value: 45, color: { colorName: 'blue' } },
      { value: 60, color: { colorName: 'green' } },
    ]

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 60,
    })

    qsRadialGenerator.pie(canvas, data)
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
