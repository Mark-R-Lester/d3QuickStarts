import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { CentroidTextChartProps } from '../../../common/chartProps'
import {
  QsCentroidText,
  QsCentroidTextData,
} from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

export const RadialTextTransition: FunctionComponent<
  CentroidTextChartProps
> = ({
  canvasConfig,
  data = [{ value: 25 }, { value: 10 }, { value: 15 }],
  config,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsCentroidText>()
  const chartDataRef = useRef<QsCentroidTextData[]>(data)

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      setElement(canvas.generate.centroid.text(chartDataRef.current, config))
    }
    createChart()
  }, [canvasConfig, config])

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
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
