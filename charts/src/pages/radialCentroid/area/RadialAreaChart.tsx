import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsRadialAreaData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialAreaChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1: QsRadialAreaData = {
        outerData: [
          15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15,
          15, 17, 16, 21, 14, 15, 16, 12, 15,
        ],
        fillColor: 'lightBlue',
      }

      const data2: QsRadialAreaData = {
        innerData: [
          15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15,
          15, 17, 16, 21, 14, 15, 16, 12, 15,
        ],
        outerData: [
          16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17,
          18, 20, 17, 23, 23, 20, 17, 16, 16,
        ],
        fillColor: 'darkBlue',
      }

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      canvas.generate.radialCentroid.area(data1)
      canvas.generate.radialCentroid.area(data2)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
