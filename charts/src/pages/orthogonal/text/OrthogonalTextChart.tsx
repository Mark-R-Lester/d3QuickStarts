import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { TextChartProps } from '../../../common/chartProps'

export const OrthogonalTextChart: FunctionComponent<TextChartProps> = ({
  canvasConfig,
  orientation,
  config = {},
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
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const getScaleType = (): QsEnumAxisScaleType => {
        if (config.scaleType === QsEnumScaleType.BANDED)
          return QsEnumAxisScaleType.BANDED
        return QsEnumAxisScaleType.POINT
      }

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.orthogonal.vertical.text(data, config)
        canvas.generate.orthogonal.vertical.axis.left({
          scale: {
            type: getScaleType(),
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
        canvas.generate.orthogonal.horizontal.axis.bottom()
      } else {
        if (config.scaleType === QsEnumScaleType.LINEAR)
          canvas.generate.orthogonal.horizontal.line({
            values: [25, 10, 35, 25, 45, 5, 25, 25],
          })
        if (config.scaleType === QsEnumScaleType.BANDED)
          canvas.generate.orthogonal.horizontal.bars([
            { highValue: 25 },
            { highValue: 10 },
            { highValue: 35 },
            { highValue: 25 },
            { highValue: 45 },
            { highValue: 5 },
            { highValue: 25 },
            { highValue: 25 },
          ])
        canvas.generate.orthogonal.horizontal.text(data, config)

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
