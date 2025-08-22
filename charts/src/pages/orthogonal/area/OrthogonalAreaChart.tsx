import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalAreaChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = {
        higherData: [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140],
      }
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      canvas.generate.orthogonal.horizontal.area(data1)
      canvas.generate.orthogonal.vertical.axis.left()
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
