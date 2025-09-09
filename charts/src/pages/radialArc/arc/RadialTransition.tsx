import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadial,
  QsArcTextData,
} from 'd3qs/d3QuickStart'
import { RadialChartProps } from '../../../common/chartProps'

export const RadialTransition: FunctionComponent<RadialChartProps> = ({
  canvasConfig,
  config,
  data = [
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
    { value: 25 },
    { value: 10 },
    { value: 15 },
    { value: 30 },
  ],
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadial>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      const { generate } = canvas
      setElement(generate.radialArc.radial(data, config))
    }
    createChart()
  }, [canvasConfig, config, data])

  useEffect(
    function transitionData() {
      const getVals = (): QsArcTextData[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ value: num })
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
