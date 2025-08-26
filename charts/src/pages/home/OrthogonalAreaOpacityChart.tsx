import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorOranges,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalAreaOpacityChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      canvas.configStore.orthogonal.areaConfig({
        defaultFillOpacity: 0.5,
        defaultStrokeWidth: 1,
        defaultStrokeOpacity: 1,
      })

      canvas.generate.orthogonal.horizontal.area({
        higherData: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
        fillColor: QsEnumColorOranges.DARKORANGE,
        strokeColor: QsEnumColorOranges.DARKORANGE,
      })
      canvas.generate.orthogonal.horizontal.area({
        higherData: [5, 15, 25, 50, 10, 10, 20, 50, 190, 10, 15, 40],
        fillColor: 'green',
        strokeColor: 'green',
      })
      canvas.generate.orthogonal.vertical.axis.left({
        tickSizeInner: -100,
        tickWidth: 0.5,
        domainWidth: 0.9,
        domainColor: 'green',
        tickColor: 'green',
        textFill: 'green',
      })
      canvas.generate.orthogonal.horizontal.axis.bottom({
        domainWidth: 0.9,
        domainColor: 'green',
        tickColor: 'green',
        textFill: 'green',
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
