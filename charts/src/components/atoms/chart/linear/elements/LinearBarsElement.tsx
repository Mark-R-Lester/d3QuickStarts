import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  QsBarBoundries,
  qsCreateCanvas,
  qsLinearBarGenerator,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const createChart = () => {
    const data: QsBarBoundries[] = [
      { upperBoundry: 25, color: 'red' },
      { upperBoundry: 10, color: 'blue' },
      { upperBoundry: 35, color: 'green' },
      { upperBoundry: 25, color: 'purple' },
      { upperBoundry: 35, color: 'black' },
      { upperBoundry: 5, color: 'yellow' },
      { upperBoundry: 25, color: 'orange' },
      { upperBoundry: 25, color: 'pink' },
    ]
    const isVertical = orientation === Orientation.VERTICAL

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    })

    if (isVertical) {
      qsLinearBarGenerator.vertical(canvas, data)
    } else {
      qsLinearBarGenerator.horizontal(canvas, data)
    }
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
