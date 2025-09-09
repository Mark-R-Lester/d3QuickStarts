import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsCentroidPoints,
  QsCentroidPointData,
} from 'd3qs/d3QuickStart'
import { RadialPointsChartProps } from '../../../common/chartProps'

export const RadialPointTransition: FunctionComponent<
  RadialPointsChartProps
> = ({
  canvasConfig,
  data = [
    { value: 1, fillColor: 'red' },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
    { value: 1 },
    { value: 2 },
  ],
  config,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsCentroidPoints>()
  const chartDataRef = useRef<QsCentroidPointData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      setElement(canvas.generate.centroid.points(chartDataRef.current, config))
    }
    createChart()
  }, [canvasConfig, config])

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
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
