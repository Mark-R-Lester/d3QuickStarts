import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { OrienetedChartProps } from '../../../common/chartProps'

export const OrthogonalLineChart: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

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
  }, [canvasProps, orientation])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
