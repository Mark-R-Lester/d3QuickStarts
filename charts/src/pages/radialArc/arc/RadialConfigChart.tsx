import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsArcConfig,
} from 'd3qs/d3QuickStart'
import { ArcChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<ArcChartProps> = ({
  canvasConfig,
  config = {},
  data = [{ value: 10 }, { value: 20 }, { value: 15 }],
}) => {
  useEffect(() => {
    const createChart = () => {
      const config: QsArcConfig = {
        outerRadius: 100,
        innerRadius: 0,
        padding: 0.9,
      }

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.configStore.radialArc.arcConfig(config)
      canvas.generate.radialArc.radial(data)
    }
    createChart()
  }, [canvasConfig, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
