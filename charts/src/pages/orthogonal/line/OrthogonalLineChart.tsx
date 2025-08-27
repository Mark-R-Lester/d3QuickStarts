import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { LineChartProps } from '../../../common/chartProps'

export const OrthogonalLineChart: FunctionComponent<LineChartProps> = ({
  canvasConfig,
  orientation,
  data = [25, 10, 35, 25, 35, 5, 25, 25],
  config = {},
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      canvas.configStore.orthogonal.lineConfig({ curve: QsEnumCurve.NATURAL })

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.orthogonal.vertical.line({
          data,
          strokeColor: 'red',
          strokeWidth: 1,
        })
        canvas.generate.orthogonal.vertical.axis.left({
          scale: {
            type: QsEnumAxisScaleType.POINT,
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
        canvas.generate.orthogonal.horizontal.axis.bottom()
      } else {
        canvas.generate.orthogonal.horizontal.line({
          data,
          strokeColor: 'red',
          strokeWidth: 1,
        })
        canvas.generate.orthogonal.vertical.axis.left()
        canvas.generate.orthogonal.horizontal.axis.bottom({
          scale: {
            type: QsEnumAxisScaleType.POINT,
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
      }
    }

    createChart()
  }, [canvasConfig, data, orientation])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
