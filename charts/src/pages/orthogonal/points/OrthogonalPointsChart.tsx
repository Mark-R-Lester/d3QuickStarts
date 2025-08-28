import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { PointChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const OrthogonalPointsChart: FunctionComponent<PointChartProps> = ({
  canvasConfig,
  orientation,
  data = [
    { value: 25 },
    { value: 10 },
    { value: 35 },
    { value: 25 },
    { value: 35 },
    { value: 5 },
    { value: 25 },
    { value: 25 },
  ],
  config = {},
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const getScaleType = (): QsEnumAxisScaleType => {
        if (config?.scaleType === QsEnumScaleType.BANDED)
          return QsEnumAxisScaleType.BANDED
        return QsEnumAxisScaleType.POINT
      }

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.orthogonal.vertical.points(data, config)
        canvas.generate.orthogonal.vertical.axis.left({
          scale: {
            type: getScaleType(),
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
        canvas.generate.orthogonal.horizontal.axis.bottom()
      } else {
        canvas.generate.orthogonal.horizontal.points(data, config)
        canvas.generate.orthogonal.vertical.axis.left()
        canvas.generate.orthogonal.horizontal.axis.bottom({
          scale: {
            type: getScaleType(),
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
      }
    }
    createChart()
  }, [canvasConfig, config, data, orientation])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
