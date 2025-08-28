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
          { highValue: 35, fillColor: 'lightGreen' },
          { highValue: 35, fillColor: 'lightGreen' },
          { highValue: 30 },
          { highValue: 25 },
          { highValue: 20 },
          { highValue: 15 },
          { highValue: 10 },
          { highValue: 5, fillColor: 'red' },
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
