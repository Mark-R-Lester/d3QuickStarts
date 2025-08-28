import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { AxisChartProps } from '../../../common/chartProps'

export const OrthogonalAxisChart: FunctionComponent<AxisChartProps> = ({
  canvasConfig,
  configH = {},
  configV = {},
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      if (configH.scale?.type === QsEnumAxisScaleType.BANDED)
        canvas.generate.orthogonal.horizontal.bars([
          { highValue: 20 },
          { highValue: 40 },
          { highValue: 80 },
          { highValue: 100 },
          { highValue: 120 },
          { highValue: 160 },
          { highValue: 180 },
        ])

      if (configH.scale?.type === QsEnumAxisScaleType.POINT)
        canvas.generate.orthogonal.horizontal.line({
          values: [20, 40, 80, 100, 120, 160, 180],
        })

      canvas.generate.orthogonal.vertical.axis.left(configV)
      canvas.generate.orthogonal.horizontal.axis.bottom(configH)
    }
    createChart()
  }, [canvasConfig, configH, configV])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
