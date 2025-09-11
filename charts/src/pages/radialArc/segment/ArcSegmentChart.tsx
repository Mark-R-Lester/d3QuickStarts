import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { SegmentChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<SegmentChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { valueRad: 40 },
    { valueRad: 20 },
    { valueRad: 45 },
    { valueRad: 35 },
    { valueRad: 18 },
    { valueRad: 45 },
    { valueRad: 30 },
    { valueRad: 20 },
    { valueRad: 45 },
    { valueRad: 15 },
    { valueRad: 38 },
    { valueRad: 45 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialArc.segment(data, config)
      canvas.generate.centroid.axis({
        defaultAxisAngle: 15,
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
