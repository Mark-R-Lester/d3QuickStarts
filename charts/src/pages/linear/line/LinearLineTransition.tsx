import { FunctionComponent, useEffect, useState } from 'react'
import { QsCanvas, qsCreateCanvas, QsLine } from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const LinearLineTransition: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsLine>()

  useEffect(() => {
    const createChart = () => {
      const data = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      let newElement: QsLine
      if (orientation === EnumOrientation.VERTICAL) {
        newElement = canvas.generate.linear.vertical.line({ data })
      } else {
        newElement = canvas.generate.linear.horizontal.line({ data })
      }
      setElement(newElement)
    }
    createChart()
  }, [canvasProps, orientation])

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
      if (orientation === EnumOrientation.VERTICAL) {
        if (element) element.transition({ data: { data: transitionData } })
      } else {
        if (element) element.transition({ data: { data: transitionData } })
      }

      setTimeout(() => setChanged(!changed), 3000)
    },
    [element, changed, orientation]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
