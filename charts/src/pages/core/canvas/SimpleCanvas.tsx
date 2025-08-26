import { FunctionComponent, useEffect } from 'react'
import { ChartPropsOthogonal } from '../../../common/chartProps'
import { qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'

export const SimpleCanvas: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      qsCreateCanvasOrthogonal(canvasConfig)
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
