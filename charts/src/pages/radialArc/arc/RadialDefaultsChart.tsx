import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialData[] = [
        { value: 100 },
        { value: 70 },
        { value: 40 },
        { value: 70 },
      ]

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.radialArc.radial(data, {
        outerRadius: 100,
        innerRadius: 0,
        padding: 2,
      })
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
