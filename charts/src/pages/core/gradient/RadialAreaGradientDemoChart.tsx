import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  qsCreateRadialGradient,
  QsRadialAreaConfig,
  QsRadialAreaData,
} from 'd3qs/d3QuickStart'

export interface BarColorDemoChartProps {
  chartName: string
  height?: number
  width?: number
  withColorStops?: boolean
  gradientId?: string
  colors?: string[]
  cx?: string
  cy?: string
  r?: string
  fx?: string
  fy?: string
}

export const RadialAreaGradientDemoChart: FunctionComponent<BarColorDemoChartProps> =
  memo(
    ({
      chartName,
      height = 300,
      width = 500,
      withColorStops = false,
      gradientId = 'radialGradient',
      colors = ['darkBlue', 'pink', 'lightblue'],
      cx = '50%',
      cy = '50%',
      r = '50%',
      fx = '50%',
      fy = '50%',
    }) => {
      useEffect(() => {
        const createChart = () => {
          const canvas: QsCanvasRadial = qsCreateCanvasRadial({
            chartName: `textEnumDemo${chartName}`,
            height,
            width,
            highestViewableValue: 160,
          })

          let gradientUrl: string

          if (withColorStops) {
            gradientUrl = qsCreateRadialGradient({
              canvas,
              gradientId,
              colors,
              cx,
              cy,
              r,
              fx,
              fy,
            })
          } else {
            gradientUrl = qsCreateRadialGradient({
              canvas,
              gradientId,
              colors,
              cx,
              cy,
              r,
              fx,
              fy,
            })
          }

          const data: QsRadialAreaData = {
            outerData: [
              150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
            ],
          }
          const config: QsRadialAreaConfig = {
            defaultFillColor: gradientUrl,
          }
          canvas.generate.radialCentroid.area(data, config)
          canvas.generate.radialCentroid.axis([
            150, 100, 120, 130, 140, 160, 160, 160, 150, 112, 156, 140,
          ])
        }
        createChart()
      }, [
        chartName,
        colors,
        cx,
        cy,
        fx,
        fy,
        gradientId,
        height,
        r,
        width,
        withColorStops,
      ])

      return <div id={`textEnumDemo${chartName}`} />
    }
  )
