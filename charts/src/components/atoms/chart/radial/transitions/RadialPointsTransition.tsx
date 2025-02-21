import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialPoints,
  QsRadialPointData,
} from 'd3qs/d3QuickStart'
import { RadialPointsChartProps } from '../../../../../common/chartProps'

export const RadialPointTransition: FunctionComponent<
  RadialPointsChartProps
> = ({ chartName, data, config }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialPoints>()
  const chartDataRef = useRef<QsRadialPointData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      })

      setElement(
        canvas.generate.radialCentroid.points(chartDataRef.current, config)
      )
    }
    createChart()
  }, [chartName, config])

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
      <div id={chartName}></div>
    </>
  )
}
