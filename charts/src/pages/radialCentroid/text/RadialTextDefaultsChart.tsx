import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'
import { QsRadialTextData } from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

export const RadialTextDefaultsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
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

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
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
