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
      if (config.spokeConfig)
        canvas.generate.radialCentroid.axis({ axisAngle: 90 })

      canvas.generate.radialCentroid.area({
        highValues: [25, 50, 75, 100, 125, 150],
      })
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
