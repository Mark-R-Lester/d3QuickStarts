import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  QsRadialText,
  QsValuedText,
  radialGenerator,
  radialTextGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialTextTransition: FunctionComponent<ChartProps> = ({
  targetId,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialText>()

  const createChart = () => {
    const data = [
      { value: 25, text: '25' },
      { value: 10, text: '10' },
      { value: 15, text: '15' },
    ]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 40,
    })

    let newElement: QsRadialText
    newElement = radialTextGenerator.followBanded(canvas, data)
    radialGenerator.doughnut(canvas, data)

    setElement(newElement)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): QsValuedText[] => {
        const vals = []
        for (let i = 0; i < 3; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ value: num, text: num.toString() })
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
