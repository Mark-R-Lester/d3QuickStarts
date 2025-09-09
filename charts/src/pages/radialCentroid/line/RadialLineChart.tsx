import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialLineChartProps } from '../../../common/chartProps'

export const RadialLineChart: FunctionComponent<RadialLineChartProps> = ({
  canvasConfig,
  config = {},
  data = {
    values: [
      16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
      20, 17, 23, 23, 20, 17, 16, 16,
    ],
  },
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialCentroid.line(data, config)
      canvas.generate.radialCentroid.spokes({
        numberOfSpokes: 26,
        defaultInnerRadius: 50,
        defaultOuterRadius: 105,
      })
      canvas.generate.radialCentroid.axis({
        numberOfRings: 5,
        showCentralTick: false,
      })
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
