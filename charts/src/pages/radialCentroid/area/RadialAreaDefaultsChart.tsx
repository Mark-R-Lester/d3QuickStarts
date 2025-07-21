import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsRadialAreaData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialAreaDefaultsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const data1: QsRadialAreaData = {
        outerData: [
          16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17,
          18, 20, 17, 23, 23, 20, 17, 16, 16,
        ],
      }

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      canvas.generate.radialCentroid.area(data1)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
