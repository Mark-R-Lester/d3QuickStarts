import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'

import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalCandleChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      const candles: QsBarData[] = [
        { upperBoundry: 20.0, lowerBoundry: 17.5, fillColor: 'red' },
        { upperBoundry: 19.0, lowerBoundry: 17.5, fillColor: 'green' },
        { upperBoundry: 19.0, lowerBoundry: 15.5, fillColor: 'red' },
        { upperBoundry: 18.0, lowerBoundry: 15.5, fillColor: 'green' },
        { upperBoundry: 18.0, lowerBoundry: 14.0, fillColor: 'red' },
        { upperBoundry: 16.5, lowerBoundry: 14.0, fillColor: 'green' },
        { upperBoundry: 16.5, lowerBoundry: 12.0, fillColor: 'red' },
        { upperBoundry: 15.5, lowerBoundry: 12.0, fillColor: 'green' },
        { upperBoundry: 15.5, lowerBoundry: 11.5, fillColor: 'red' },
        { upperBoundry: 14.0, lowerBoundry: 11.5, fillColor: 'green' },
        { upperBoundry: 14.0, lowerBoundry: 10.0, fillColor: 'red' },
        { upperBoundry: 13.5, lowerBoundry: 10.0, fillColor: 'green' },
        { upperBoundry: 13.5, lowerBoundry: 9.0, fillColor: 'red' },
        { upperBoundry: 12.0, lowerBoundry: 9.0, fillColor: 'green' },
        { upperBoundry: 12.0, lowerBoundry: 7.5, fillColor: 'red' },
        { upperBoundry: 10.5, lowerBoundry: 7.5, fillColor: 'green' },
        { upperBoundry: 10.5, lowerBoundry: 6.5, fillColor: 'red' },
        { upperBoundry: 9.5, lowerBoundry: 6.5, fillColor: 'green' },
        { upperBoundry: 9.5, lowerBoundry: 7.0, fillColor: 'red' },
        { upperBoundry: 10.0, lowerBoundry: 7.0, fillColor: 'green' },
        { upperBoundry: 12.5, lowerBoundry: 10.0, fillColor: 'green' },
        { upperBoundry: 15.0, lowerBoundry: 12.5, fillColor: 'green' },
        { upperBoundry: 18.5, lowerBoundry: 15.0, fillColor: 'green' },
        { upperBoundry: 20.0, lowerBoundry: 18.5, fillColor: 'green' },
        { upperBoundry: 22.5, lowerBoundry: 20.0, fillColor: 'green' },
        { upperBoundry: 22.5, lowerBoundry: 19.5, fillColor: 'red' },
        { upperBoundry: 21.0, lowerBoundry: 19.5, fillColor: 'green' },
        { upperBoundry: 21.0, lowerBoundry: 18.0, fillColor: 'red' },
        { upperBoundry: 21.5, lowerBoundry: 18.0, fillColor: 'green' },
      ]

      const wicks: QsBarData[] = [
        { upperBoundry: 22.0, lowerBoundry: 16.5, fillColor: 'red' },
        { upperBoundry: 21.5, lowerBoundry: 15.0, fillColor: 'green' },
        { upperBoundry: 21.0, lowerBoundry: 13.5, fillColor: 'red' },
        { upperBoundry: 20.5, lowerBoundry: 13.0, fillColor: 'green' },
        { upperBoundry: 20.0, lowerBoundry: 11.5, fillColor: 'red' },
        { upperBoundry: 19.0, lowerBoundry: 11.0, fillColor: 'green' },
        { upperBoundry: 18.5, lowerBoundry: 9.0, fillColor: 'red' },
        { upperBoundry: 18.0, lowerBoundry: 8.5, fillColor: 'green' },
        { upperBoundry: 17.5, lowerBoundry: 8.0, fillColor: 'red' },
        { upperBoundry: 16.5, lowerBoundry: 6.5, fillColor: 'green' },
        { upperBoundry: 16.0, lowerBoundry: 6.0, fillColor: 'red' },
        { upperBoundry: 15.5, lowerBoundry: 6.0, fillColor: 'green' },
        { upperBoundry: 15.0, lowerBoundry: 6.0, fillColor: 'red' },
        { upperBoundry: 14.5, lowerBoundry: 6.0, fillColor: 'green' },
        { upperBoundry: 14.0, lowerBoundry: 6.0, fillColor: 'red' },
        { upperBoundry: 13.5, lowerBoundry: 6.0, fillColor: 'green' },
        { upperBoundry: 12.5, lowerBoundry: 6.0, fillColor: 'red' },
        { upperBoundry: 11.5, lowerBoundry: 6.0, fillColor: 'green' },
        { upperBoundry: 11.0, lowerBoundry: 6.0, fillColor: 'red' },
        { upperBoundry: 12.0, lowerBoundry: 6.0, fillColor: 'green' },
        { upperBoundry: 14.5, lowerBoundry: 7.5, fillColor: 'green' },
        { upperBoundry: 17.5, lowerBoundry: 9.0, fillColor: 'green' },
        { upperBoundry: 21.0, lowerBoundry: 12.0, fillColor: 'green' },
        { upperBoundry: 23.5, lowerBoundry: 15.0, fillColor: 'green' },
        { upperBoundry: 25.0, lowerBoundry: 17.5, fillColor: 'green' },
        { upperBoundry: 25.0, lowerBoundry: 17.0, fillColor: 'red' },
        { upperBoundry: 23.5, lowerBoundry: 16.5, fillColor: 'green' },
        { upperBoundry: 23.5, lowerBoundry: 15.0, fillColor: 'red' },
        { upperBoundry: 25.0, lowerBoundry: 16.5, fillColor: 'green' },
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
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
