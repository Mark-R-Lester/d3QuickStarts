import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsRadialData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialDefaultsChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialData[] = [
        { value: 100 },
        { value: 70 },
        { value: 40 },
        { value: 70 },
      ]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)
      canvas.generate.radialArc.radial(data, {
        outerRadius: 100,
        innerRadius: 0,
        padding: 1,
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
