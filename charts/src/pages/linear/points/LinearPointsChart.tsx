import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsEnumAxisScaleType,
  QsPointData,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const LinearPointsChart: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPointData[] = [
        {
          value: 25,
          fillColor: 'green',
          radius: 10,
          strokeWidth: 5,
          strokeColor: 'red',
          strokeOpacity: 0.4,
          fillOpacity: 0.5,
        },
        { value: 10 },
        { value: 35, fillColor: 'red' },
        { value: 25 },
        { value: 35, fillColor: 'red' },
        { value: 5 },
        { value: 25, fillColor: 'red' },
        { value: 25 },
      ]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.points(data, { defaultRadius: 3 })
        canvas.generate.linear.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
          domainScale: QsEnumAxisScaleType.POINT,
        })
        canvas.generate.linear.horizontal.axis.bottom([])
      } else {
        canvas.generate.linear.horizontal.points(data, { defaultRadius: 3 })
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
