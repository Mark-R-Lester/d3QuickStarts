import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { ArcTextChartProps } from '../../../common/chartProps'

export const ArcTextChart: FunctionComponent<ArcTextChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { value: 10 },
    { value: 15 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.arc.text.follow(data, config)
      if (config.scaleType === QsEnumScaleType.BANDED)
        canvas.generate.arc.slice(
          [
            { valueArc: 10 },
            { valueArc: 15 },
            { valueArc: 10 },
            { valueArc: 15 },
            { valueArc: 20 },
          ],
          config
        )
      else if (config.scaleType === QsEnumScaleType.LINEAR) {
        canvas.generate.centroid.area({ highValues: [10, 15, 10, 15, 20] })
        canvas.generate.centroid.spokes({ numberOfSpokes: 5 })
      }
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
