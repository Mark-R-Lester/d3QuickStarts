import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPlottedTextData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedTextDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      const data: QsPlottedTextData[] = [
        { x: 10, y: 100, text: 'Text with no config uses defaults' },
        { x: 10, y: 10 },
        { x: 25, y: 25 },
        { x: 50, y: 50 },
        { x: 75, y: 75 },
        { x: 90, y: 90 },
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
