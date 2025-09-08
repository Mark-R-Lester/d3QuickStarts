import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialAreaChartProps } from '../../../common/chartProps'

export const RadialAreaChart: FunctionComponent<RadialAreaChartProps> = ({
  canvasConfig,
  config = {},
  data1 = {
    highValues: [
      15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15, 15,
      17, 16, 21, 14, 15, 16, 12, 15,
    ],
  },
  data2,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.configStore.radialCentroid.areaConfig(config)

      canvas.generate.radialCentroid.area(data1)
      if (data2) canvas.generate.radialCentroid.area(data2)
      canvas.generate.radialCentroid.spokes({
        numberOfSpokes: 26,
        innerRadius: 15,
      })
      canvas.generate.radialCentroid.axis({ radius: 95 })
    }
    createChart()
  }, [canvasConfig, config, data1, data2])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
