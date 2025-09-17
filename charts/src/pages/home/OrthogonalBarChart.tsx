import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

import { ChartPropsOrthogonal } from '../../common/chartProps'

export const OrthogonalBarChart: FunctionComponent<ChartPropsOrthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      canvas.configStore.orthogonal.barConfig({ defaultFillColor: 'darkBlue' })

      const data: QsBarData[] = [
        { highValue: 37, lowValue: 6 },
        { highValue: 35 },
        { highValue: 18 },
        { highValue: 21 },
        { highValue: 22 },
        { highValue: 8 },
        { highValue: 12 },
        { highValue: 5 },
      ]

      canvas.generate.orthogonal.vertical.axis.left({
        tickSizeInner: -100,
        tickColor: '#FFFACD',
        numberOfTicks: 3,
      })
      canvas.generate.orthogonal.horizontal.bars(data)
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
