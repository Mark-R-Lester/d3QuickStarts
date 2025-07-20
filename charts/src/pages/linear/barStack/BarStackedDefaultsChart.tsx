import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsEnumAxisScaleType,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const BarStackedDefaultsChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data = [
        [10, 20, 16, 23],
        [16, 32, 30, 26],
        [40, 16, 12, 16],
        [10, 4, 13, 32],
        [10, 37, 21, 8],
        [10, 20, 16, 23],
        [10, 32, 30, 26],
        [15, 16, 12, 16],
        [10, 4, 13, 32],
      ]
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      canvas.generate.linear.horizontal.barStack({ data })
      canvas.generate.linear.vertical.axis.left([])
      canvas.generate.linear.horizontal.axis.bottom(
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        {
          domainScale: QsEnumAxisScaleType.BANDED,
        }
      )
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
