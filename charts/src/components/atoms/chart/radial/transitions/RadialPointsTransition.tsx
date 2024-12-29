import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialPoints,
  qsRadialPointGenerator,
  QsRadialPointData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPointTransition: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialPoints>()
  const data = [
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
    { value: 1, color: 'red' },
    { value: 2, color: 'blue' },
  ]
  const chartDataRef = useRef<QsRadialPointData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 600,
        lowestViewableValue: 0,
        highestViewableValue: 2.5,
      })
      let newElement: QsRadialPoints
      newElement = qsRadialPointGenerator.points(canvas, chartDataRef.current)

      setElement(newElement)
    }
    createChart()
  }, [chartName])

  useEffect(
    function transitionData() {
      chartDataRef.current = chartDataRef.current.map((d) => {
        if (d.value === 1) return { value: 2, color: 'blue' }
        return { value: 1, color: 'red' }
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
