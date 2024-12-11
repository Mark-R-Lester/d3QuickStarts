import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  qsLegendGenerator,
  QsValuedColor,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedLegendElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsValuedColor[] = [
      { value: 'Red', color: 'red' },
      { value: 'Blue', color: 'blue' },
      { value: 'Green', color: 'green' },
      { value: 'Purple', color: 'purple' },
    ]

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    qsLegendGenerator.legend(canvas, data, { color: 'black' })
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
