import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { BarChartProps } from '../../../../../common/chartProps'

export const LinearBarsElement: FunctionComponent<BarChartProps> = ({
  canvasProps,
  orientation,
  data,
  config,
}) => {
  useEffect(() => {
    const createChart = () => {
      const isVertical = orientation === EnumOrientation.VERTICAL
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      if (isVertical) {
        canvas.generate.linear.vertical.bars(data, config)
        canvas.generate.linear.horizontal.axis.bottom([0, 35])
        canvas.generate.linear.vertical.axis.leftBanded([
          1, 2, 3, 4, 5, 6, 7, 8,
        ])
      } else {
        canvas.generate.linear.horizontal.bars(data, config)
        canvas.generate.linear.vertical.axis.left([0, 35])
        canvas.generate.linear.horizontal.axis.bottomBanded([
          1, 2, 3, 4, 5, 6, 7, 8,
        ])
      }
    }
    createChart()
  }, [canvasProps, config, data, orientation])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
