import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearLineGenerator,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearLineElement: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    })

    if (orientation === EnumOrientation.VERTICAL) {
      qsLinearLineGenerator.vertical(canvas, { data, color: 'red' })
    } else {
      qsLinearLineGenerator.horizontal(canvas, { data })
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
