import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsCentroidLine,
} from 'd3qs/d3QuickStart'
import { ChartPropsOrthogonal } from '../../../common/chartProps'

export const RadialLineTransition: FunctionComponent<ChartPropsOrthogonal> = ({
  canvasConfig,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsCentroidLine>()

  useEffect(() => {
    const createChart = () => {
      const values = [25, 10, 35, 25, 35, 5, 25, 25]
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      let newElement: QsCentroidLine
      newElement = canvas.generate.centroid.line({ values })

      setElement(newElement)
    }
    createChart()
  }, [canvasConfig])

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

      const values = getVals()

      if (element) element.transition({ data: { values } })

      setTimeout(() => setChanged(!changed), 3000)
    },
    [element, changed]
  )

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
