import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { OrienetedChartProps } from '../../../common/chartProps'

export const LinearLineChart: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.line({
          data,
          strokeColor: 'red',
          strokeWidth: 1,
        })
        canvas.generate.linear.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
          domainScale: QsEnumAxisScaleType.POINT,
        })
        canvas.generate.linear.horizontal.axis.bottom([])
      } else {
        canvas.generate.linear.horizontal.line({
          data,
          strokeColor: 'red',
          strokeWidth: 1,
        })
        canvas.generate.linear.vertical.axis.left([])
        canvas.generate.linear.horizontal.axis.bottom(
          [1, 2, 3, 4, 5, 6, 7, 8],
          {
            domainScale: QsEnumAxisScaleType.POINT,
          }
        )
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
