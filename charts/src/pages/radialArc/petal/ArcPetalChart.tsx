import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { PetalChartProps } from '../../../common/chartProps'

export const ArcPetalChart: FunctionComponent<PetalChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { valueArc: 20, valueRad: 45 },
    { valueArc: 60, valueRad: 20 },
    { valueArc: 20, valueRad: 40 },
    { valueArc: 15, valueRad: 30 },
    { valueArc: 10, valueRad: 20 },
    { valueArc: 20, valueRad: 45 },
    { valueArc: 15, valueRad: 30 },
    { valueArc: 10, valueRad: 45 },
    { valueArc: 15, valueRad: 30 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialArc.petal(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
