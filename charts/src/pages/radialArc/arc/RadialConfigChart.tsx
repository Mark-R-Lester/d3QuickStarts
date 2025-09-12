import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { ArcChartProps } from '../../../common/chartProps'

export const ArcChart: FunctionComponent<ArcChartProps> = ({
  canvasConfig,
  config = {},
  config2 = {},
  data = [{ valueArc: 10 }, { valueArc: 20 }, { valueArc: 15 }],
  data2,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.arc.slice(data, config)

      if (data2) {
        canvas.generate.arc.slice(data2, config2)
        canvas.generate.arc.text.horizontal(
          [
            { value: 50, text: 'blues' },
            { value: 50, text: 'greens' },
          ],
          {
            radius: 30,
            scaleType: QsEnumScaleType.BANDED,
            textFontSize: 10,
            textFill: 'white',
          }
        )
        canvas.generate.arc.text.follow(
          [
            { value: 13, text: 'Deep Teal' },
            { value: 17, text: 'Slate Blue' },
            { value: 15, text: 'Steel Blue' },
            { value: 15, text: 'Sky Blue' },
            { value: 20, text: 'Midnight Blue' },
            { value: 17, text: 'Sage Green' },
            { value: 17, text: 'Mint Green' },
            { value: 16, text: 'Sea Green' },
            { value: 15, text: 'Pale Green' },
            { value: 15, text: 'Dark Green' },
          ],
          {
            scaleType: QsEnumScaleType.BANDED,
            textFontSize: 4,
            radius: 88,
            textFill: 'white',
          }
        )
      }
    }
    createChart()
  }, [canvasConfig, config, config2, data, data2])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
