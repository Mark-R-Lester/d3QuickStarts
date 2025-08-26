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
    [10, 20, 16, 23],
    [16, 32, 30, 26],
    [40, 16, 12, 16],
    [10, 4, 13, 32],
    [10, 37, 21, 8],
    [10, 20, 16, 23],
    [10, 32, 30, 26],
    [15, 16, 12, 16],
    [10, 4, 13, 32],
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      canvas.generate.orthogonal.horizontal.barStack({ data }, config)
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
