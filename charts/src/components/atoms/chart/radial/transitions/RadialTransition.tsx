import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadial,
  QsValuedText,
} from 'd3qs/d3QuickStart'
import { RadialChartProps } from '../../../../../common/chartProps'

export const RadialTransition: FunctionComponent<RadialChartProps> = ({
  chartName,
  chartWidth,
  config,
  data,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadial>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: chartWidth,
        lowestViewableValue: 0,
        highestViewableValue: 40,
      })
      const { generate } = canvas
      setElement(generate.radialArc.radial(data, config))
    }
    createChart()
  }, [chartName, chartWidth, config, data])

  useEffect(
    function transitionData() {
      const getVals = (): QsValuedText[] => {
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
      <div id={chartName}></div>
    </>
  )
}
