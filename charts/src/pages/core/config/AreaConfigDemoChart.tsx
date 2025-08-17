import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsAreaConfig,
  QsAreaData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

export interface BarColorDemoChartProps {
  chartName: string
  height?: number
  width?: number
  config?: QsAreaConfig
}

export const AreaConfigDemoChart: FunctionComponent<BarColorDemoChartProps> =
  memo(({ chartName, height = 300, width = 500, config = {} }) => {
    useEffect(() => {
      const createChart = () => {
        const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
          chartName: `textEnumDemo${chartName}`,
          height,
          width,
          highestViewableValue: 160,
        })

        const data: QsAreaData = {
          higherData: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
        }
        canvas.generate.orthogonal.horizontal.area(data, config)
        canvas.generate.orthogonal.vertical.axis.left()
      }
      createChart()
    }, [chartName, config, height, width])

    return <div id={`textEnumDemo${chartName}`} />
  })
