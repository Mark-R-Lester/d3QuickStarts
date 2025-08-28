import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsAreaConfig,
  QsAreaData,
  QsCanvasOrthogonal,
  QsColorStop,
  qsCreateCanvasOrthogonal,
  qsCreateCustomStopOrthogonalGradient,
  qsCreateOrthogonalGradient,
} from 'd3qs/d3QuickStart'

export interface BarColorDemoChartProps {
  chartName: string
  height?: number
  width?: number
  withColorStops?: boolean
  gradientId?: string
  colorStops?: QsColorStop[]
  colors?: string[]
  x1?: string
  y1?: string
  x2?: string
  y2?: string
}

export const AreaConfigDemoChart: FunctionComponent<BarColorDemoChartProps> =
  memo(
    ({
      chartName,
      height = 300,
      width = 500,
      gradientId = 'orthogonalGradient',
      colors = ['lightblue', 'darkblue'],
      colorStops,
      x1 = '0%',
      y1 = '0%',
      x2 = '0%',
      y2 = '100%',
    }) => {
      useEffect(() => {
        const createChart = () => {
          const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
            chartName: `textEnumDemo${chartName}`,
            height,
            width,
            highestViewableValue: 160,
          })
          let gradientUrl: string

          if (colorStops) {
            gradientUrl = qsCreateCustomStopOrthogonalGradient({
              canvas,
              gradientId,
              colorStops,
              x1,
              y1,
              x2,
              y2,
            })
          } else {
            gradientUrl = qsCreateOrthogonalGradient({
              canvas,
              gradientId,
              colors,
              x1,
              y1,
              x2,
              y2,
            })
          }

          const data: QsAreaData = {
            highValues: [
              150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
            ],
          }

          const config: QsAreaConfig = {
            defaultFillColor: gradientUrl,
          }
          canvas.generate.orthogonal.horizontal.area(data, config)
          canvas.generate.orthogonal.vertical.axis.left()
        }
        createChart()
      }, [
        chartName,
        colors,
        gradientId,
        height,
        width,
        colorStops,
        x1,
        x2,
        y1,
        y2,
      ])

      return <div id={`textEnumDemo${chartName}`} />
    }
  )
