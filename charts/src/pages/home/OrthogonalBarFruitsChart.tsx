import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsOrdinalScaleData,
} from 'd3qs/d3QuickStart'

import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalBarFruitsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasConfig }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const data: QsBarData[] = [
        { upperBoundry: 35 },
        { upperBoundry: 35 },
        { upperBoundry: 30 },
        { upperBoundry: 25 },
        { upperBoundry: 20 },
        { upperBoundry: 15 },
        { upperBoundry: 10 },
        { upperBoundry: 5 },
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
            'PINEAPPLE',
            'STRAWBERRY',
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
