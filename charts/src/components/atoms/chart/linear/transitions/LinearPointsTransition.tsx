import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  linearPointGenerator,
  QsLine,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearPointsTransition: FunctionComponent<OrienetedChartProps> = ({
  targetId,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsLine>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 50,
    })
    let newElement: QsLine
    if (orientation === Orientation.VERTICAL) {
      newElement = linearPointGenerator.vertical(canvas, data)
    } else {
      newElement = linearPointGenerator.horizontal(canvas, data)
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
      <div id={targetId}></div>
    </>
  )
}
