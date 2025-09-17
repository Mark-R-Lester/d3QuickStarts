import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { UnboundTextChartProps } from '../../../common/chartProps'

export const UnboundTextChart: FunctionComponent<UnboundTextChartProps> = ({
  canvasConfig,
  config1 = {},
  data1 = [
    { x: 2, y: 90, text: 'Using unbound' },
    { x: 2, y: 85, text: 'text to provide' },
    { x: 2, y: 80, text: 'information' },
    { x: 2, y: 70, text: 'How many of' },
    { x: 2, y: 65, text: 'each fruit do I' },
    { x: 2, y: 60, text: 'eat each week' },
  ],
  config2 = {},
  data2 = undefined,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      canvas.generate.orthogonal.horizontal.bars(
        [
          { highValue: 9 },
          { highValue: 4 },
          { highValue: 6 },
          { highValue: 2 },
          { highValue: 8 },
          { highValue: 10 },
        ],
        {
          fillColorScaleData: {
            type: QsEnumColorScale.ORDINAL,
            range: [
              '#DC143C',
              '#DAA520',
              '#FF4500',
              '#FF8C00',
              '#228B22',
              '#534c0cff',
            ],
          },
        }
      )
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom({
        textFontSize: 3,
        scale: {
          type: QsEnumAxisScaleType.BANDED,
          domain: ['APPLE', 'MANGO', 'KIWI', 'FIG', 'DATE', 'GRAPE'],
        },
      })
      canvas.generate.unbound.text(data1, config1)
      if (data2) {
        canvas.generate.unbound.text(data2, config2)
      }
    }
    createChart()
  }, [canvasConfig, config1, config2, data1, data2])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
