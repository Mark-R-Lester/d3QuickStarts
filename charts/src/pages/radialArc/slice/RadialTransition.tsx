import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadial,
  QsArcSliceData,
} from 'd3qs/d3QuickStart'
import { ArcChartProps } from '../../../common/chartProps'

export const RadialTransition: FunctionComponent<ArcChartProps> = ({
  canvasConfig,
  config,
  data = [
    { valueArc: 25 },
    { valueArc: 10 },
    { valueArc: 15 },
    { valueArc: 30 },
    { valueArc: 25 },
    { valueArc: 10 },
    { valueArc: 15 },
    { valueArc: 30 },
  ],
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadial>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      const { generate } = canvas
      setElement(generate.arc.slice(data, config))
    }
    createChart()
  }, [canvasConfig, config, data])

  useEffect(
    function transitionData() {
      const getVals = (): QsArcSliceData[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ valueArc: num })
        }
        return vals
      }

      const transitionData = getVals()

      if (element) element.transition({ data: transitionData })
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
