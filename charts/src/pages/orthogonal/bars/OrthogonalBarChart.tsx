import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { BarChartProps } from '../../../common/chartProps'

export const SimpleBarChart: FunctionComponent<BarChartProps> = ({
  canvasConfig,
  orientation,
  config = {},
  data = [
    { upperBoundry: 35, lowerBoundry: 5 },
    { upperBoundry: 35, lowerBoundry: 10 },
    { upperBoundry: 30, lowerBoundry: 15 },
    { upperBoundry: 25 },
    { upperBoundry: 20 },
    { upperBoundry: 15 },
    { upperBoundry: 10 },
    { upperBoundry: 5 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const isVertical = orientation === EnumOrientation.VERTICAL
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      if (isVertical) {
        canvas.generate.orthogonal.vertical.bars(data, config)
        canvas.generate.orthogonal.horizontal.axis.bottom()
        canvas.generate.orthogonal.vertical.axis.left({
          scale: {
            type: QsEnumAxisScaleType.BANDED,
            domain: [1, 2, 3, 4, 5, 6, 7, 8],
          },
        })
      } else {
        canvas.generate.orthogonal.horizontal.bars(data, config)
        canvas.generate.orthogonal.vertical.axis.left()
        canvas.generate.orthogonal.horizontal.axis.bottom({
          scale: {
            type: QsEnumAxisScaleType.BANDED,
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
