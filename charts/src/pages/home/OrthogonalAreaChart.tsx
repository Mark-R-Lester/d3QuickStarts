import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  qsCreateorthogonalGradient,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalAreaChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      const gradientUrl: string = qsCreateorthogonalGradient({
        canvas,
        gradientId: 'redBlue',
        colors: ['red', 'darkblue'],
      })
      canvas.generate.orthogonal.horizontal.area({
        higherData: data1,
        fillColor: gradientUrl,
      })
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom({
        scale: {
          type: QsEnumAxisScaleType.POINT,
          domain: [
            'JAN',
            'FEB',
            'MAR',
            'APR',
            'MAY',
            'JUN',
            'JUL',
            'AUG',
            'SEP',
            'OCT',
            'NOV',
            'DEC',
          ],
        },
      })
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
