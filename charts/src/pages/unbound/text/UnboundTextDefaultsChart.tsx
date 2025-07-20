import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsUnboundTextData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const UnboundTextDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      const data: QsUnboundTextData[] = [
        { x: 0, y: 5, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.unbound.text(data)
      canvas.generate.linear.vertical.axis.left([])
      canvas.generate.linear.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
