import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
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

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    qsLegendGenerator.legend(canvas, data, {
      color: 'red', //does nothing
      x: 10,
      y: 50,
      height: 3,
      width: 10,
      space: 8,
      font: 'block',
      angle: 45, //does nothing
      alignmentBaseline: '50', //does nothing
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
