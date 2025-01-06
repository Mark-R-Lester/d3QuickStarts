import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPieElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsRadialData[] = [
      { value: 15, fillColor: 'steelblue' },
      { value: 45, fillColor: 'blue' },
      { value: 60, fillColor: 'green' },
      { value: 15, fillColor: 'steelblue' },
      { value: 45, fillColor: 'blue' },
      { value: 60, fillColor: 'green' },
      { value: 15, fillColor: 'steelblue' },
      { value: 45, fillColor: 'blue' },
      { value: 60, fillColor: 'green' },
      { value: 15, fillColor: 'steelblue' },
      { value: 45, fillColor: 'blue' },
      { value: 60, fillColor: 'green' },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 60,
    })

    canvas.generate.radial.radial(data, {
      outerRadius: 90,
      innerRadius: 50,
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
