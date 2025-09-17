import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'

import { ChartPropsOrthogonal } from '../../common/chartProps'

export const OrthogonalCandleChart: FunctionComponent<ChartPropsOrthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const candles: QsBarData[] = [
        { highValue: 20.0, lowValue: 17.5, fillColor: 'red' },
        { highValue: 19.0, lowValue: 17.5, fillColor: 'green' },
        { highValue: 19.0, lowValue: 15.5, fillColor: 'red' },
        { highValue: 18.0, lowValue: 15.5, fillColor: 'green' },
        { highValue: 18.0, lowValue: 14.0, fillColor: 'red' },
        { highValue: 16.5, lowValue: 14.0, fillColor: 'green' },
        { highValue: 16.5, lowValue: 12.0, fillColor: 'red' },
        { highValue: 15.5, lowValue: 12.0, fillColor: 'green' },
        { highValue: 15.5, lowValue: 11.5, fillColor: 'red' },
        { highValue: 14.0, lowValue: 11.5, fillColor: 'green' },
        { highValue: 14.0, lowValue: 10.0, fillColor: 'red' },
        { highValue: 13.5, lowValue: 10.0, fillColor: 'green' },
        { highValue: 13.5, lowValue: 9.0, fillColor: 'red' },
        { highValue: 12.0, lowValue: 9.0, fillColor: 'green' },
        { highValue: 12.0, lowValue: 7.5, fillColor: 'red' },
        { highValue: 10.5, lowValue: 7.5, fillColor: 'green' },
        { highValue: 10.5, lowValue: 6.5, fillColor: 'red' },
        { highValue: 9.5, lowValue: 6.5, fillColor: 'green' },
        { highValue: 9.5, lowValue: 7.0, fillColor: 'red' },
        { highValue: 10.0, lowValue: 7.0, fillColor: 'green' },
        { highValue: 12.5, lowValue: 10.0, fillColor: 'green' },
        { highValue: 15.0, lowValue: 12.5, fillColor: 'green' },
        { highValue: 18.5, lowValue: 15.0, fillColor: 'green' },
        { highValue: 20.0, lowValue: 18.5, fillColor: 'green' },
        { highValue: 22.5, lowValue: 20.0, fillColor: 'green' },
        { highValue: 22.5, lowValue: 19.5, fillColor: 'red' },
        { highValue: 21.0, lowValue: 19.5, fillColor: 'green' },
        { highValue: 21.0, lowValue: 18.0, fillColor: 'red' },
        { highValue: 21.5, lowValue: 18.0, fillColor: 'green' },
      ]

      const wicks: QsBarData[] = [
        { highValue: 22.0, lowValue: 16.5, fillColor: 'red' },
        { highValue: 21.5, lowValue: 15.0, fillColor: 'green' },
        { highValue: 21.0, lowValue: 13.5, fillColor: 'red' },
        { highValue: 20.5, lowValue: 13.0, fillColor: 'green' },
        { highValue: 20.0, lowValue: 11.5, fillColor: 'red' },
        { highValue: 19.0, lowValue: 11.0, fillColor: 'green' },
        { highValue: 18.5, lowValue: 9.0, fillColor: 'red' },
        { highValue: 18.0, lowValue: 8.5, fillColor: 'green' },
        { highValue: 17.5, lowValue: 8.0, fillColor: 'red' },
        { highValue: 16.5, lowValue: 6.5, fillColor: 'green' },
        { highValue: 16.0, lowValue: 6.0, fillColor: 'red' },
        { highValue: 15.5, lowValue: 6.0, fillColor: 'green' },
        { highValue: 15.0, lowValue: 6.0, fillColor: 'red' },
        { highValue: 14.5, lowValue: 6.0, fillColor: 'green' },
        { highValue: 14.0, lowValue: 6.0, fillColor: 'red' },
        { highValue: 13.5, lowValue: 6.0, fillColor: 'green' },
        { highValue: 12.5, lowValue: 6.0, fillColor: 'red' },
        { highValue: 11.5, lowValue: 6.0, fillColor: 'green' },
        { highValue: 11.0, lowValue: 6.0, fillColor: 'red' },
        { highValue: 12.0, lowValue: 6.0, fillColor: 'green' },
        { highValue: 14.5, lowValue: 7.5, fillColor: 'green' },
        { highValue: 17.5, lowValue: 9.0, fillColor: 'green' },
        { highValue: 21.0, lowValue: 12.0, fillColor: 'green' },
        { highValue: 23.5, lowValue: 15.0, fillColor: 'green' },
        { highValue: 25.0, lowValue: 17.5, fillColor: 'green' },
        { highValue: 25.0, lowValue: 17.0, fillColor: 'red' },
        { highValue: 23.5, lowValue: 16.5, fillColor: 'green' },
        { highValue: 23.5, lowValue: 15.0, fillColor: 'red' },
        { highValue: 25.0, lowValue: 16.5, fillColor: 'green' },
      ]

      canvas.generate.orthogonal.horizontal.bars(candles, { padding: 50 })
      canvas.generate.orthogonal.horizontal.bars(wicks, { padding: 90 })
      canvas.generate.orthogonal.vertical.axis.left({
        tickSizeInner: -100,
        tickWidth: 0.5,
        domainWidth: 0.9,
        domainColor: 'white',
        tickColor: 'white',
        textFill: 'white',
      })
      canvas.generate.orthogonal.horizontal.axis.bottom({
        scale: {
          type: QsEnumAxisScaleType.BANDED,
          domain: ['JUNE'],
        },
        domainWidth: 0.9,
        domainColor: 'white',
        tickColor: 'white',
        textFill: 'white',
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
