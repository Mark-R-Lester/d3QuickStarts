import { FunctionComponent, useEffect } from 'react'
import {
  QsAreaData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'

export interface AreaColorDemoChartProps {
  chartName: string

  height?: number
  width?: number
}

export const AreaColorDemoChart: FunctionComponent<AreaColorDemoChartProps> = ({
  chartName,

  height = 70,
  width = 500,
}: AreaColorDemoChartProps) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
        chartName: `textEnumDemo${chartName}`,
        height,
        width,
        highestViewableValue: 100,
      })

      const horizontalArea: QsAreaData = {
        higherData: [10, 20, 50, 90, 10, 50, 90, 10, 70, 50],
      }
      canvas.generate.orthogonal.horizontal.area(horizontalArea)
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.vertical.axis.right(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        { domainScale: QsEnumAxisScaleType.POINT }
      )
    }
    createChart()
  }, [chartName, height, width])

  return (
    <>
      <div id={`textEnumDemo${chartName}`}></div>
    </>
  )
}
