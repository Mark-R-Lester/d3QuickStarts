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
      canvas.generate.centroid.spokes({
        numberOfSpokes: 6,
        defaultInnerRadius: 10,
        defaultOuterRadius: 105,
      })
      canvas.generate.centroid.axis(config)
      canvas.generate.centroid.points(
        [
          { value: 50 },
          { value: 75 },
          { value: 100 },
          { value: 125 },
          { value: 150 },
          { value: 240 },
        ],
        { defaultRadius: 1.2 }
      )
    }
    createChart()
  }, [canvasConfig, config])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
