import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsTextData } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../common/enums'
import { OrienetedChartProps } from '../../../common/chartProps'

export const LinearTextElement: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsTextData[] = [
        { value: 25 },
        { value: 10 },
        { value: 35 },
        { value: 25 },
        { value: 35 },
        { value: 5 },
        { value: 25 },
        { value: 25 },
      ]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.text(data, { defaultRadius: 3 })
      } else {
        canvas.generate.linear.horizontal.text(data, { defaultRadius: 3 })
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
