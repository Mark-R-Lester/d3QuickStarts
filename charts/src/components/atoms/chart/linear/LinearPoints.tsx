import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPointData } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../common/enums'
import { OrienetedChartProps } from '../../../../common/chartProps'

export const LinearPointsElement: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsPointData[] = [
        {
          value: 25,
          fillColor: 'green',
          radius: 10,
          strokeWidth: 5,
          strokeColor: 'red',
          strokeOpacity: 0.4,
          fillOpacity: 0.5,
        },
        { value: 10 },
        { value: 35, fillColor: 'red' },
        { value: 25 },
        { value: 35, fillColor: 'red' },
        { value: 5 },
        { value: 25, fillColor: 'red' },
        { value: 25 },
      ]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      if (orientation === EnumOrientation.VERTICAL) {
        canvas.generate.linear.vertical.points(data, { defaultRadius: 3 })
      } else {
        canvas.generate.linear.horizontal.points(data, { defaultRadius: 3 })
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
