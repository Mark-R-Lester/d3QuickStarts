import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsCentroidPointData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialPointsChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsCentroidPointData[] = [
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

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.centroid.points(data)
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
