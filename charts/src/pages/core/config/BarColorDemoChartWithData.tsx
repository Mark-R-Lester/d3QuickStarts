import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsBarConfig,
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'

export interface BarColorDemoChartWithDataProps {
  chartName: string
  height?: number
  width?: number
}

export const BarColorDemoChartWithData: FunctionComponent<BarColorDemoChartWithDataProps> =
  memo(({ chartName, height = 300, width = 500 }) => {
    useEffect(() => {
      const createChart = () => {
        const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
          chartName: `textEnumDemo${chartName}`,
          height,
          width,
          highestViewableValue: 35,
        })

        const data: QsBarData[] = [
          { upperBoundry: 35, fillColor: 'lightGreen' },
          { upperBoundry: 35, fillColor: 'lightGreen' },
          { upperBoundry: 30 },
          { upperBoundry: 25 },
          { upperBoundry: 20 },
          { upperBoundry: 15 },
          { upperBoundry: 10 },
          { upperBoundry: 5, fillColor: 'red' },
        ]

        const config: QsBarConfig = {
          defaultFillColor: 'blue',
          fillColorScaleData: {
            domain: [1, 35],
            range: ['lightblue', 'darkblue'],
            type: QsEnumColorScale.SEQUENTIAL,
          },
        }
        canvas.generate.orthogonal.horizontal.bars(data, config)
        canvas.generate.orthogonal.vertical.axis.left()
      }
      createChart()
    }, [chartName, height, width])

    return <div id={`textEnumDemo${chartName}`} />
  })
