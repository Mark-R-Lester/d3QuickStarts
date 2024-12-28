import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearPointGenerator,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearPointsElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const createChart = () => {
    const data = [
      { value: 25, color: 'red' },
      { value: 10 },
      { value: 35, color: 'red' },
      { value: 25 },
      { value: 35, color: 'red' },
      { value: 5 },
      { value: 25, color: 'red' },
      { value: 25 },
    ]
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    })

    if (orientation === EnumOrientation.VERTICAL) {
      qsLinearPointGenerator.vertical(canvas, data, { radius: 10 })
    } else {
      qsLinearPointGenerator.horizontal(canvas, data, { radius: 5 })
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
