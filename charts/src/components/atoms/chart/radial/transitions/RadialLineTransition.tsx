import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialLine,
  qsRadialLineGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialLineTransition: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialLine>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    })

    let newElement: QsRadialLine
    newElement = qsRadialLineGenerator.line(canvas, data)

    setElement(newElement)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): number[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push(num)
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
