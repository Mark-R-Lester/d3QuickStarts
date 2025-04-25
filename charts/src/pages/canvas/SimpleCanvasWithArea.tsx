import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsAreaData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../common/chartProps'

export const SimpleCanvasWithArea: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      const data: QsAreaData = {
        higherData: [100, 100],
      }
      canvas.generate.linear.horizontal.area(data)
      canvas.generate.linear.vertical.axis.left([0, 100])
      canvas.generate.linear.horizontal.axis.bottom(['0', '1'])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName} />
    </>
  )
}
