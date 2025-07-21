import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsRadialData,
  QsRadialArcConfig,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsRadialData[] = [
        {
          value: 1,
          fillColor: 'salmon',
          fillOpacity: 0.5,
          strokeWidth: 1,
          strokeColor: 'grey',
        },
        { value: 1, fillColor: 'salmon' },
        { value: 1, fillColor: 'hotpink' },
        { value: 1, fillColor: 'hotpink' },
        { value: 1, fillColor: 'maroon' },
        { value: 1, fillColor: 'darksalmon' },
        { value: 1, fillColor: 'brown' },
        { value: 1, fillColor: 'purple' },
        { value: 1, fillColor: 'salmon' },
      ]

      const config: QsRadialArcConfig = {
        outerRadius: 90,
        innerRadius: 50,
        padding: 0.9,
      }

      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      canvas.configStore.radialArc.arcConfig(config)
      canvas.generate.radialArc.radial(data)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
