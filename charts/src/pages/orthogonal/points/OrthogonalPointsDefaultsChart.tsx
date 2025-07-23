import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsPointData,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const OrthogonalPointsDefaultsChart: FunctionComponent<
  OrienetedChartProps
> = ({ canvasProps, orientation }) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPointData[] = [
        { value: 25 },
        { value: 10 },
        { value: 35 },
        { value: 25 },
        { value: 35 },
        { value: 5 },
        { value: 25 },
        { value: 25 },
      ]
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.orthogonal.vertical.points(data)
        canvas.generate.orthogonal.vertical.axis.left(
          [1, 2, 3, 4, 5, 6, 7, 8],
          {
            domainScale: QsEnumAxisScaleType.POINT,
          }
        )
        canvas.generate.orthogonal.horizontal.axis.bottom([])
      } else {
        canvas.generate.orthogonal.horizontal.points(data)
        canvas.generate.orthogonal.vertical.axis.left([])
        canvas.generate.orthogonal.horizontal.axis.bottom(
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
