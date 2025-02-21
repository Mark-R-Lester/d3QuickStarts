import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, QsBarData, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  chartWidth,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsBarData[] = [
        { upperBoundry: 25, fillColor: 'red' },
        { upperBoundry: 10, fillColor: 'blue' },
        { upperBoundry: 35, fillColor: 'green' },
        { upperBoundry: 25, fillColor: 'purple' },
        { upperBoundry: 35, fillColor: 'black' },
        { upperBoundry: 5, fillColor: 'yellow' },
        { upperBoundry: 25, fillColor: 'orange' },
        { upperBoundry: 25, fillColor: 'pink' },
      ]

      const isVertical = orientation === EnumOrientation.VERTICAL

      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: chartWidth,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      })

      if (isVertical) {
        canvas.generate.linear.vertical.bars(data)
      } else {
        canvas.generate.linear.horizontal.bars(data)
      }
    }
    createChart()
  }, [chartName, chartWidth, orientation])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
