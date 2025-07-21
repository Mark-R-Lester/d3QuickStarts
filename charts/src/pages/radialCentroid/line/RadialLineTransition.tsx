import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsRadialLine,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialLineTransition: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialLine>()

  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      let newElement: QsRadialLine
      newElement = canvas.generate.radialCentroid.line({ data })

      setElement(newElement)
    }
    createChart()
  }, [canvasProps])

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

      if (element) element.transition({ data: { data: transitionData } })

      setTimeout(() => setChanged(!changed), 3000)
    },
    [element, changed]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
