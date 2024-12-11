import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  QsBarBoundries,
  createCanvas,
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
      { upperBoundry: 25 },
      { upperBoundry: 10 },
      { upperBoundry: 35 },
      { upperBoundry: 25 },
      { upperBoundry: 35 },
      { upperBoundry: 5 },
      { upperBoundry: 25 },
      { upperBoundry: 25 },
    ]
    const isVertical = orientation === Orientation.VERTICAL

    const canvas: QsCanvas = createCanvas({
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
