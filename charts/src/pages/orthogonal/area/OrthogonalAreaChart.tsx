import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalAreaChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = {
        highValues: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
      }
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      canvas.generate.orthogonal.horizontal.area(data1)
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
