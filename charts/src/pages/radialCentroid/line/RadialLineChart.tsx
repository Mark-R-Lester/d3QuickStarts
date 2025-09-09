import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { CentroidLineChartProps } from '../../../common/chartProps'

export const RadialLineChart: FunctionComponent<CentroidLineChartProps> = ({
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
      canvas.generate.centroid.line(data, config)
      canvas.generate.centroid.spokes({
        numberOfSpokes: 26,
        defaultInnerRadius: 50,
        defaultOuterRadius: 105,
      })
      canvas.generate.centroid.axis({
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
