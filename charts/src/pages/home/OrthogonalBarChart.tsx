import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
} from 'd3qs/d3QuickStart'

import { ChartPropsOthogonal } from '../../common/chartProps'

export const OrthogonalBarChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)
      canvas.configStore.orthogonal.barConfig({ defaultFillColor: 'darkBlue' })

      const data: QsBarData[] = [
        { upperBoundry: 37, lowerBoundry: 6 },
        { upperBoundry: 35 },
        { upperBoundry: 18 },
        { upperBoundry: 21 },
        { upperBoundry: 22 },
        { upperBoundry: 8 },
        { upperBoundry: 12 },
        { upperBoundry: 5 },
      ]

      canvas.generate.orthogonal.horizontal.bars(data)
      canvas.generate.orthogonal.vertical.axis.left({
        tickSizeInner: -100,
        tickColor: '#FFFACD',
        numberOfTicks: 3,
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
