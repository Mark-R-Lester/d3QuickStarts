import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, qsFindMax } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const LinearBarsGroupedElement: FunctionComponent<ChartProps> = ({
  chartName,
  chartWidth,
}) => {
  useEffect(() => {
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
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: chartWidth,
        lowestViewableValue: 0,
        highestViewableValue: qsFindMax(data),
      })

      canvas.generate.linear.horizontal.barGroup(data)
    }
    createChart()
  }, [chartName, chartWidth])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
