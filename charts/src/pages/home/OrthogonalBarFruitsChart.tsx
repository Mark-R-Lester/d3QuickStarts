import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsOrdinalScaleData,
} from 'd3qs/d3QuickStart'

import { ChartPropsOrthogonal } from '../../common/chartProps'

export const OrthogonalBarFruitsChart: FunctionComponent<
  ChartPropsOrthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const data: QsBarData[] = [
        { highValue: 35 },
        { highValue: 35 },
        { highValue: 30 },
        { highValue: 25 },
        { highValue: 20 },
        { highValue: 15 },
        { highValue: 10 },
        { highValue: 5 },
      ]

      const ordinalScaleData: QsOrdinalScaleData = {
        type: QsEnumColorScale.ORDINAL,
        range: [
          '#DC143C',
          '#DAA520',
          '#FF4500',
          '#FF8C00',
          '#228B22',
          '#FFFACD',
          '#FF2400',
          '#DDA0DD',
        ],
      }
      canvas.generate.orthogonal.horizontal.bars(data, {
        fillColorScaleData: ordinalScaleData,
      })
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom({
        scale: {
          type: QsEnumAxisScaleType.BANDED,
          domain: [
            'APPLE',
            'BANANA',
            'ORANGE',
            'MANGO',
            'KIWI',
            'FIG',
            'DATE',
            'GRAPE',
          ],
        },
      })
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
