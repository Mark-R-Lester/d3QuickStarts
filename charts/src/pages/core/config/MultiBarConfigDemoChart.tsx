import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsBarConfig,
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

export interface MultiBarDemoChartProps {
  chartName: string
  height?: number
  width?: number
  configCanvasLevel?: QsBarConfig
  data1?: QsBarData[]
  data2?: QsBarData[]
  config1?: QsBarConfig
  config2?: QsBarConfig
}

export const MultiBarConfigDemoChart: FunctionComponent<MultiBarDemoChartProps> =
  memo(
    ({
      chartName,
      height = 300,
      width = 500,
      configCanvasLevel = {},
      data1 = [
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
        { highValue: 30 },
      ],
      data2 = [
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
        { highValue: 75, lowValue: 40 },
      ],
      config1 = {},
      config2 = {},
    }) => {
      useEffect(() => {
        const createChart = () => {
          const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
            chartName: `textEnumDemo${chartName}`,
            height,
            width,
            highestViewableValue: 80,
          })

          canvas.configStore.orthogonal.barConfig(configCanvasLevel)
          canvas.generate.orthogonal.horizontal.bars(data1, config1)
          canvas.generate.orthogonal.horizontal.bars(data2, config2)
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
