import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { BarStackChartProps } from '../../../common/chartProps'

export const BarStackedChart: FunctionComponent<BarStackChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
    [{ value: 16 }, { value: 32 }, { value: 30 }, { value: 26 }],
    [{ value: 40 }, { value: 16 }, { value: 12 }, { value: 16 }],
    [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
    [{ value: 10 }, { value: 37 }, { value: 21 }, { value: 8 }],
    [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
    [{ value: 10 }, { value: 32 }, { value: 30 }, { value: 26 }],
    [{ value: 15 }, { value: 16 }, { value: 12 }, { value: 16 }],
    [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      canvas.generate.orthogonal.horizontal.barStack(data, config)
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom({
        scale: {
          type: QsEnumAxisScaleType.BANDED,
          domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        },
      })
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
