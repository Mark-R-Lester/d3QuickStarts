import { FunctionComponent, useEffect, useState } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialLine } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialLineTransition: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsRadialLine>()

  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 600,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      })

      let newElement: QsRadialLine
      newElement = canvas.generate.radialCentroid.line({ data })

      setElement(newElement)
    }
    createChart()
  }, [chartName])

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
      <div id={chartName}></div>
    </>
  )
}
