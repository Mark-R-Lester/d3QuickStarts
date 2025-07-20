import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  qsCreateorthogonalGradient,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const OrthogonalAreaChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      const gradientUrl: string = qsCreateorthogonalGradient({
        canvas,
        gradientId: 'redBlue',
        colors: ['red', 'darkblue'],
      })
      canvas.generate.orthogonal.horizontal.area({
        higherData: data1,
        fillColor: gradientUrl,
      })
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.horizontal.axis.bottom(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        {
          domainScale: QsEnumAxisScaleType.POINT,
        }
      )
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
