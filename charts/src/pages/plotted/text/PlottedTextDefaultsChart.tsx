import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPlottedTextArgs } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedTextDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      const data: QsPlottedTextArgs[] = [
        { x: 0, y: 0, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.plotted.text(data)
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
