import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const AxiesDefaultsChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
