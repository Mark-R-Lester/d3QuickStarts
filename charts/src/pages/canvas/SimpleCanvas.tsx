import { FunctionComponent, useEffect } from 'react'
import { ChartPropsOthogonal } from '../../common/chartProps'
import { qsCreateCanvas } from 'd3qs/d3QuickStart'

export const SimpleCanvas: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      qsCreateCanvas(canvasProps)
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
