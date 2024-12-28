import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadial,
  QsValuedText,
  qsRadialGenerator,
} from 'd3qs/d3QuickStart'
import { RadialChartProps } from '../../../../../common/chartProps'

export const RadialTransition: FunctionComponent<RadialChartProps> = ({
  chartName,
  config,
  data,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadial>()

  const createChart = () => {
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 40,
    })

    setElement(qsRadialGenerator.radial(canvas, data, config))
  }

  useEffect(() => {
    createChart()
  }, [])

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
