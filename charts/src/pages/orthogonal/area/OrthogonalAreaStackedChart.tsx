import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalAreaStackedChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = {
        highValues: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
      }
      const data2 = {
        lowValues: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
        highValues: [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 170, 190],
        fillColor: 'darkBlue',
      }

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      canvas.configStore.orthogonal.areaConfig({
        curve: QsEnumCurve.NATURAL,
        defaultFillOpacity: 0.4,
        defaultFillColor: 'orange',
      })
      canvas.generate.orthogonal.horizontal.area(data1)
      canvas.generate.orthogonal.horizontal.area(data2)
      canvas.generate.orthogonal.vertical.axis.left()
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
