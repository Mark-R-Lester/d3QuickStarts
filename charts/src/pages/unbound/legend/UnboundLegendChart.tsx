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
    { value: 'Strawberry', fillColor: 'red' },
    { value: 'Blueberry', fillColor: 'blue' },
    { value: 'Apple', fillColor: 'green' },
    { value: 'Plum', fillColor: 'purple' },
    { value: 'Orange', fillColor: 'orange' },
    { value: 'Rasberry', fillColor: 'pink' },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.generate.arc.slice(
        [
          { valueArc: 22 },
          { valueArc: 15 },
          { valueArc: 10 },
          { valueArc: 20 },
          { valueArc: 12 },
          { valueArc: 5 },
        ],
        {
          fillColorScaleData: {
            type: QsEnumColorScale.ORDINAL,
            range: ['green', 'red', 'blue', 'purple', 'orange', 'pink'],
          },
          padding: 0,
          innerRadius: 70,
        }
      )
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
