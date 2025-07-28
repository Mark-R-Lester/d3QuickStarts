import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsUnboundTextData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const UnboundTextDefaultsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      const data: QsUnboundTextData[] = [
        { x: 0, y: 5, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.unbound.text(data)
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
