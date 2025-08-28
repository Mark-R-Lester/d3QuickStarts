import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  qsCreateOrthogonalGradient,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalAreaChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const gradientUrl: string = qsCreateOrthogonalGradient({
        canvas,
        gradientId: 'redBlue',
        colors: ['red', 'darkblue'],
      })
      canvas.generate.orthogonal.horizontal.area({
        highValues: data1,
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
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
