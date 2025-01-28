import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPointData } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearTextElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPointData[] = [
        { value: 25 },
        { value: 10 },
        { value: 35 },
        { value: 25 },
        { value: 35 },
        { value: 5 },
        { value: 25 },
        { value: 25 },
      ]
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 600,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      })

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.text(data, { defaultRadius: 3 })
      } else {
        canvas.generate.linear.horizontal.text(data, { defaultRadius: 3 })
      }
    }
    createChart()
  }, [chartName, orientation])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
