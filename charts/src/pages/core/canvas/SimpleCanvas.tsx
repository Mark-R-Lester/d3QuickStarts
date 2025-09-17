import { FunctionComponent, useEffect } from 'react'
import { ChartPropsOrthogonal } from '../../../common/chartProps'
import { qsCreateCanvasOrthogonal } from 'd3qs/d3QuickStart'

export const SimpleCanvas: FunctionComponent<ChartPropsOrthogonal> = ({
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
