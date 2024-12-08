import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  QsRadialPoints,
  radialPointGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialPointTransition: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialPoints>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 40,
    })

    let newElement: QsRadialPoints
    newElement = radialPointGenerator.points(canvas, data)

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

      if (element) element.transition(transitionData)

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
