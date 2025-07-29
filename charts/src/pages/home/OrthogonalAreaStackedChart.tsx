import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalAreaStackedChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]
      const data2 = [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 170, 190]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)
      canvas.configStore.orthogonal.areaConfig({ curve: QsEnumCurve.NATURAL })

      canvas.generate.orthogonal.horizontal.area({
        higherData: data1,
        fillColor: 'lightBlue',
      })

      canvas.generate.orthogonal.horizontal.area({
        higherData: data2,
        lowerData: data1,
        fillColor: 'darkBlue',
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
