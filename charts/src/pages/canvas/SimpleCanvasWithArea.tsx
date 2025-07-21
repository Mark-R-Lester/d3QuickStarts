import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsAreaData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../common/chartProps'

export const SimpleCanvasWithArea: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)
      const data: QsAreaData = {
        higherData: [100, 100],
      }
      canvas.generate.orthogonal.horizontal.area(data)
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName} />
    </>
  )
}
