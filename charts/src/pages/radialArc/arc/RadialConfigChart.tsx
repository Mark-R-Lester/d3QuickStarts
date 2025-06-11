import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialData,
  QsRadialConfig,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<ChartProps> = ({
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

      const config: QsRadialConfig = {
        outerRadius: 90,
        innerRadius: 50,
        padAngle: 0.03,
      }

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      canvas.generate.radialArc.radial(data, config)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
