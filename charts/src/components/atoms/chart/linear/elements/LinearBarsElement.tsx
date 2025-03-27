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
      } else {
        canvas.generate.linear.horizontal.bars(data, config)
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
