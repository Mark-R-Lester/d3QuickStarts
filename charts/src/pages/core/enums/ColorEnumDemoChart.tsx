import { FunctionComponent, useEffect } from 'react'
import { qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'

export interface ColorEnumDemoChartProps {
  chartName: string
  color: string
  height?: number
  width?: number
}

export const ColorEnumDemoChart: FunctionComponent<ColorEnumDemoChartProps> = ({
  chartName,
  color,
  height = 50,
  width = 70,
}: ColorEnumDemoChartProps) => {
  useEffect(() => {
    const createChart = () => {
      qsCreateCanvasOrthogonal({
        chartName: `colorEnumDemo${chartName}`,
        height,
        width,
        highestViewableValue: 100,
        fillColor: color,
        borderColor: 'black',
      })
    }
    createChart()
  }, [chartName, color, height, width])

  return (
    <>
      <div id={`colorEnumDemo${chartName}`}></div>
    </>
  )
}
