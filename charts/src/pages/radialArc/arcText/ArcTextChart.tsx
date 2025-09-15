import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumArcTextAngularPosition,
} from 'd3qs/d3QuickStart'
import { ArcTextChartProps } from '../../../common/chartProps'

export const ArcTextChart: FunctionComponent<ArcTextChartProps> = ({
  canvasConfig,
  config1 = {},
  data1 = [
    { value: 10 },
    { value: 15 },
    { value: 10 },
    { value: 15 },
    { value: 20 },
  ],
  config2,
  data2,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      if (config1.angularPosition === QsEnumArcTextAngularPosition.BANDED)
        canvas.generate.arc.slice([
          { valueArc: 10 },
          { valueArc: 15 },
          { valueArc: 10 },
          { valueArc: 15 },
          { valueArc: 20 },
        ])
      else if (
        config1.angularPosition === QsEnumArcTextAngularPosition.CENTROID_LOCK
      ) {
        canvas.generate.centroid.area({ highValues: [10, 15, 10, 15, 20] })
        canvas.generate.centroid.spokes({ numberOfSpokes: 5 })
      }
      canvas.generate.arc.text.horizontal(data1, config1)
      if (data2) canvas.generate.arc.text.follow(data2, config2)
    }
    createChart()
  }, [canvasConfig, config1, config1.angularPosition, config2, data1, data2])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
