import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../common/enums'
import { OrienetedChartProps } from '../../../../common/chartProps'

export const LinearLineElement: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.line({ data, color: 'red' })
      } else {
        canvas.generate.linear.horizontal.line({ data })
      }
    }
    createChart()
  }, [canvasProps, orientation])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
