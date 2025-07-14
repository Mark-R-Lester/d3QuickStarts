import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'
import { QsRadialTextData } from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

export const RadialTextDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialTextData[] = [
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
        { value: 1 },
        { value: 2 },
      ]

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.radialCentroid.text(data)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
