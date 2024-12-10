import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  createCanvas,
  linearLineGenerator,
  QsLine,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearLineTransition: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsLine>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 35,
    })
    let newElement: QsLine
    if (orientation === Orientation.VERTICAL) {
      newElement = linearLineGenerator.vertical(canvas, data)
    } else {
      newElement = linearLineGenerator.horizontal(canvas, data)
    }
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
      if (orientation === Orientation.VERTICAL) {
        if (element) element.transition(transitionData)
      } else {
        if (element) element.transition(transitionData)
      }

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
