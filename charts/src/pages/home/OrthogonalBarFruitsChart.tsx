import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
  QsEnumColorScale,
  QsOrdinalColorScaleData,
} from 'd3qs/d3QuickStart'

import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalBarFruitsChart: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

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

      const ordinalScaleData: QsOrdinalColorScaleData = {
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
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
