import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsAreaData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const SimpleCanvasWithArea: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      const data: QsAreaData = {
        highValues: [100, 100],
      }
      canvas.generate.orthogonal.horizontal.area(data)
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom()
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName} />
    </>
  )
}
