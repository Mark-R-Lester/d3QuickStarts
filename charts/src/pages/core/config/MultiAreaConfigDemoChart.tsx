import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsAreaConfig,
  QsAreaData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

export interface MultiAreaDemoChartProps {
  chartName: string
  height?: number
  width?: number
  data1?: QsAreaData
  data2?: QsAreaData
  configCanvasLevel?: QsAreaConfig
  config1?: QsAreaConfig
  config2?: QsAreaConfig
}

export const MultiAreaConfigDemoChart: FunctionComponent<MultiAreaDemoChartProps> =
  memo(
    ({
      chartName,
      height = 300,
      width = 500,
      data1 = {
        highValues: [25, 50, 50, 30, 40, 15, 20, 15, 10, 70, 10, 14],
      },
      data2 = {
        highValues: [50, 60, 70, 50, 50, 26, 80, 60, 102, 112, 156, 140],
      },
      configCanvasLevel = {},
      config1 = {},
      config2 = {},
    }) => {
      useEffect(() => {
        const createChart = () => {
          const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
            chartName: `textEnumDemo${chartName}`,
            height,
            width,
            highestViewableValue: 160,
          })

          canvas.configStore.orthogonal.areaConfig(configCanvasLevel)
          canvas.generate.orthogonal.horizontal.area(data1, config1)
          canvas.generate.orthogonal.horizontal.area(data2, config2)
          canvas.generate.orthogonal.vertical.axis.left()
        }
        createChart()
      }, [
        chartName,
        config1,
        config2,
        configCanvasLevel,
        data1,
        data2,
        height,
        width,
      ])

      return <div id={`textEnumDemo${chartName}`} />
    }
  )
