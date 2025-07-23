import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsRadialPoints,
  QsRadialPointData,
} from 'd3qs/d3QuickStart'
import { RadialPointsChartProps } from '../../../common/chartProps'

export const RadialPointTransition: FunctionComponent<
  RadialPointsChartProps
> = ({ canvasProps, data, config }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialPoints>()
  const chartDataRef = useRef<QsRadialPointData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      setElement(
        canvas.generate.radialCentroid.points(chartDataRef.current, config)
      )
    }
    createChart()
  }, [canvasProps, config])

  useEffect(
    function transitionData() {
      chartDataRef.current = chartDataRef.current.map((d) => {
        if (d.fillColor) {
          return d.value === 1
            ? {
                value: 2,
                fillColor: 'blue',
                radius: 5,
                strokeWidth: 2,
                strokeOpacity: 1,
              }
            : {
                value: 1,
                fillColor: 'red',
                radius: 2,
                strokeWidth: 0,
                strokeOpacity: 0,
              }
        } else {
          return d.value === 1 ? { value: 2 } : { value: 1 }
        }
      })

      if (element) element.transition({ data: chartDataRef.current })

      setTimeout(() => setChanged(!changed), 3000)
    },
    [element, changed]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
