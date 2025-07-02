import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialAreaData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialAreaDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1: QsRadialAreaData = {
        outerData: [
          16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17,
          18, 20, 17, 23, 23, 20, 17, 16, 16,
        ],
      }

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

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
