import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialTextChartProps } from '../../../common/chartProps'
import {
  QsRadialText,
  QsRadialTextData,
} from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

export const RadialTextTransition: FunctionComponent<RadialTextChartProps> = ({
  canvasProps,
  data,
  config,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialText>()
  const chartDataRef = useRef<QsRadialTextData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasProps)

      setElement(
        canvas.generate.radialCentroid.text(chartDataRef.current, config)
      )
    }
    createChart()
  }, [canvasProps, config])

  useEffect(
    function transitionData() {
      chartDataRef.current = chartDataRef.current.map((d) => {
        return d.value === 1
          ? {
              value: 2,
              fillColor: 'blue',
            }
          : {
              value: 1,
              fillColor: 'red',
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
