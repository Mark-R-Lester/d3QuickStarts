import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsEnumCoordinateView,
  QsPlottedTextData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedTextDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      const data: QsPlottedTextData[] = [
        { x: 10, y: 100, text: 'Text with no config uses defaults' },
        { x: 10, y: 10 },
        { x: 25, y: 25 },
        { x: 50, y: 50 },
        { x: 75, y: 75 },
        { x: 90, y: 95 },
      ]
      canvas.generate.plotted.text(data, {
        defaultCooridinateView: QsEnumCoordinateView.SHOW_X_AND_Y,
      })
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
