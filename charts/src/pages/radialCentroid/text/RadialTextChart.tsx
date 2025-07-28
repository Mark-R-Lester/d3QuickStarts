import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadialPointData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialTextChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialPointData[] = [
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

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasProps)
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
