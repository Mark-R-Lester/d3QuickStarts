import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasPlotted,
  qsCreateCanvasPlotted,
  QsPlottedLineData,
} from 'd3qs/d3QuickStart'
import { ChartPropsPlotted } from '../../../common/chartProps'

export const PlottedLineDefaultsChart: FunctionComponent<ChartPropsPlotted> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPlottedLineData = {
        coordinates: [
          { x: 15, y: 10 },
          { x: 20, y: 30 },
          { x: 40, y: 26 },
          { x: 90, y: 15 },
          { x: 102, y: 112 },
          { x: 156, y: 140 },
        ],
      }

      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted(canvasProps)
      canvas.generate.plotted.line(data)
      canvas.generate.orthogonal.vertical.axis.left()
      canvas.generate.orthogonal.horizontal.axis.bottom()
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
