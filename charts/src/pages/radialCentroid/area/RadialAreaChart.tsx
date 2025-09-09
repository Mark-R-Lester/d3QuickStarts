import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { CentroidAreaChartProps } from '../../../common/chartProps'

export const RadialAreaChart: FunctionComponent<CentroidAreaChartProps> = ({
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

      canvas.configStore.centroid.areaConfig(config)

      canvas.generate.centroid.area(data1)
      if (data2) canvas.generate.centroid.area(data2)
      canvas.generate.centroid.spokes({
        numberOfSpokes: 26,
        innerRadius: 15,
      })
      canvas.generate.centroid.axis({ radius: 95 })
    }
    createChart()
  }, [canvasConfig, config, data1, data2])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
