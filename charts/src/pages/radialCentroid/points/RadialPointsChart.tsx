import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialPointData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialPointsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialPointData[] = [
        { value: 1, fillColor: 'red' },
        { value: 2 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 2 },
        { value: 1 },
        { value: 2 },
      ]

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.radialCentroid.points(data)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
