import { FunctionComponent, useEffect } from 'react'
import { QsCanvasOrthogonal, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialSpokesDefaultsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      const numberOfSpokes = 6
      canvas.generate.radialCentroid.spokes(numberOfSpokes)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
