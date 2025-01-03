import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialPointData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPointsElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsRadialPointData[] = [
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
      { value: 1 },
      { value: 2 },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 2,
    })

    canvas.generate.radial.points(data)
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
