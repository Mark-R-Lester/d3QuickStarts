import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { ArcChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<ArcChartProps> = ({
  canvasConfig,
  config = {},
  data = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialArc.arc(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
