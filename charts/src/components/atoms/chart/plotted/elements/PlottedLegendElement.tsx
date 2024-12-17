import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLegendGenerator,
  QsValuedColor,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import { QsEnumAlignmentBaseline, QsEnumTextAnchor } from 'd3qs/core/qsEnums'

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

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    qsLegendGenerator.legend(canvas, data, {
      color: 'red', //does nothing
      x: 0,
      y: 100,
      height: 1,
      width: 7,
      space: 4,
      font: 'block',
      fontSize: 3,
      angle: 45, //does nothing
      alignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
      textAnchor: QsEnumTextAnchor.START,
      stroke: 'blue', //does nothing
      fill: 'yellow', //does nothing
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
