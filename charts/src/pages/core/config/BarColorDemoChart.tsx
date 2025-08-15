import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsBarConfig,
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

export interface BarColorDemoChartProps {
  chartName: string
  height?: number
  width?: number
  config?: QsBarConfig
}

export const BarColorDemoChart: FunctionComponent<BarColorDemoChartProps> =
  memo(({ chartName, height = 300, width = 500, config = {} }) => {
    useEffect(() => {
      const createChart = () => {
        const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
          chartName: `textEnumDemo${chartName}`,
          height,
          width,
          highestViewableValue: 35,
        })

        const data: QsBarData[] = [
          { upperBoundry: 35 },
          { upperBoundry: 35 },
          { upperBoundry: 30 },
          { upperBoundry: 25 },
          { upperBoundry: 20 },
          { upperBoundry: 15 },
          { upperBoundry: 10 },
          { upperBoundry: 5 },
        ]
        canvas.generate.orthogonal.horizontal.bars(data, config)
        canvas.generate.orthogonal.vertical.axis.left()
      }
      createChart()
    }, [chartName, config, height, width])

    return <div id={`textEnumDemo${chartName}`} />
  })
