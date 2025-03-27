import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPieElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialData[] = [
        { value: 15, fillColor: 'steelblue' },
        { value: 45, fillColor: 'blue' },
        { value: 60, fillColor: 'green' },
        { value: 15, fillColor: 'steelblue' },
        { value: 45, fillColor: 'blue' },
        { value: 60, fillColor: 'green' },
        { value: 15, fillColor: 'steelblue' },
        { value: 45, fillColor: 'blue' },
        { value: 60, fillColor: 'green' },
        { value: 15, fillColor: 'steelblue' },
        { value: 45, fillColor: 'blue' },
        { value: 60, fillColor: 'green' },
      ]

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      canvas.generate.radialArc.radial(data, {
        outerRadius: 90,
        innerRadius: 50,
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
