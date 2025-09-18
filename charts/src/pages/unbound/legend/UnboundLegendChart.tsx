import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { UnboundLegendChartProps } from '../../../common/chartProps'

export const UnboundLegendChart: FunctionComponent<UnboundLegendChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { value: 'Red', fillColor: 'red' },
    { value: 'Blue', fillColor: 'blue' },
    { value: 'Green', fillColor: 'green' },
    { value: 'Purple', fillColor: 'purple' },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      // canvas.generate.arc.slice(
      //   [
      //     { valueArc: 10 },
      //     { valueArc: 10 },
      //     { valueArc: 10 },
      //     { valueArc: 10 },
      //   ],
      //   {
      //     fillColorScaleData: {
      //       type: QsEnumColorScale.ORDINAL,
      //       range: ['green', 'red', 'blue', 'purple'],
      //     },
      //   }
      // )
      canvas.generate.unbound.legend(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
