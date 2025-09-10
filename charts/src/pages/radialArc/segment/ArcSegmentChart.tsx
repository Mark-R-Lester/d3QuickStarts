import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { SegmentChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<SegmentChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { valueRad: 10 },
    { valueRad: 20 },
    { valueRad: 45 },
    { valueRad: 15 },
    { valueRad: 18 },
    { valueRad: 45 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.centroid.segment(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
