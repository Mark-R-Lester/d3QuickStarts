import { FunctionComponent, useEffect } from 'react'
import { ChartPropsOthogonal } from '../../common/chartProps'
import { qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'

export const SimpleCanvas: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      qsCreateCanvasOrthogonal(canvasProps)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
