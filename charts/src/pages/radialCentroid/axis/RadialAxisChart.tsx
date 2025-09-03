import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialAxisChartProps } from '../../../common/chartProps'

export const RadialAxisChart: FunctionComponent<RadialAxisChartProps> = ({
  canvasConfig,
  config = {},
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialCentroid.spokes({
        numberOfSpokes: 6,
        innerRadius: 10,
      })
      canvas.generate.radialCentroid.axis(config)
    }
    createChart()
  }, [canvasConfig, config])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
