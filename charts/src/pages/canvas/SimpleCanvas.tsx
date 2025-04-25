import { FunctionComponent, useEffect } from 'react'
import { ChartProps } from '../../common/chartProps'
import { qsCreateCanvas } from 'd3qs/d3QuickStart'

export const SimpleCanvas: FunctionComponent<ChartProps> = ({
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
