import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialData,
  QsRadialConfig,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialDoughnutElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsRadialData[] = [
      { value: 1, color: 'salmon' },
      { value: 1, color: 'salmon' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'maroon' },
      { value: 1, color: 'darksalmon' },
      { value: 1, color: 'brown' },
      { value: 1, color: 'magenta' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'hotpink' },
      { value: 1, color: 'purple' },
      { value: 1, color: 'purple' },
      { value: 1, color: 'purple' },
      { value: 1, color: 'salmon' },
      { value: 1, color: 'salmon' },
      { value: 1, color: 'maroon' },
      { value: 1, color: 'salmon' },
    ]

    const config: QsRadialConfig = {
      outerRadius: 90,
      innerRadius: 50,
      padAngle: 0.03,
    }

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })
    canvas.generate.radial.radial(data, config)
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
