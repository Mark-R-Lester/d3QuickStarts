import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumArcTextRadialPosition,
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
      if (config.radialPosition === QsEnumArcTextRadialPosition.OFFSET_BANDED)
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
      else if (config.radialPosition === QsEnumArcTextRadialPosition.POINT) {
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
