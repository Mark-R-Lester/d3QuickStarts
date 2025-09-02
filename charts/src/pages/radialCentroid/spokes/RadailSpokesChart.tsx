import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialSpokesChartProps } from '../../../common/chartProps'

export const RadialSpokesChart: FunctionComponent<RadialSpokesChartProps> = ({
  canvasConfig,
  config = { numberOfSpokes: 6 },
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.generate.radialCentroid.spokes(config)
    }
    createChart()
  }, [canvasConfig, config])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
