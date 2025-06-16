import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsEnumAxisScaleType,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { OrienetedChartProps } from '../../../common/chartProps'

export const LinearLineDefaultsChart: FunctionComponent<
  OrienetedChartProps
> = ({ canvasProps, orientation }) => {
  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.configStore.linear.lineConfig({
        curve: QsEnumCurve.NATURAL,
        defaultStrokeColor: 'green',
        defaultStrokeWidth: 10,
        defaultStrokeOpacity: 0.5,
      })

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.line({
          data,
        })
        canvas.generate.linear.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
          domainScale: QsEnumAxisScaleType.POINT,
        })
        canvas.generate.linear.horizontal.axis.bottom([])
      } else {
        canvas.generate.linear.horizontal.line({
          data,
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
