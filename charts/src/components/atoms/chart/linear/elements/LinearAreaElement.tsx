import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import { QsEnumCurve } from 'd3qs/core/enums/qsEnums'

export const LinearAreaElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]
    const data2 = [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 205, 240]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    canvas.generate.linear.horizontal
      .area(
        { higherData: data1, color: 'blue' },
        { curve: QsEnumCurve.MONOTONE_X }
      )
      .element.attr('fill-opacity', '0.5')

    canvas.generate.linear.horizontal
      .area(
        { higherData: data2, lowerData: data1, color: 'red' },
        { curve: QsEnumCurve.MONOTONE_X }
      )
      .element.attr('fill-opacity', '0.5')
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
