import { FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsArea,
  QsAreaData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalAreaTransition: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [topArea, setTopArea] = useState<QsArea>()
  const [bottomArea, setBottomArea] = useState<QsArea>()
  const colorIndex = useRef<number>(0)

  useEffect(() => {
    const createChart = () => {
      const lowerData: number[] = [
        15, 10, 20, 30, 40, 26, 90, 15, 10, 30, 25, 50,
      ]
      const higherData: number[] = [
        25, 15, 40, 36, 80, 100, 96, 30, 100, 98, 100, 60,
      ]

      const dataUpper: QsAreaData = {
        lowerData,
        higherData,
        fillColor: 'blue',
      }
      const dataLower: QsAreaData = {
        higherData: lowerData,
      }

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      let newTopArea = canvas.generate.orthogonal.horizontal.area(dataUpper)
      let newBottomArea = canvas.generate.orthogonal.horizontal.area(dataLower)

      setTopArea(newTopArea)
      setBottomArea(newBottomArea)
    }
    createChart()
  }, [canvasProps])

  useEffect(
    function transitionData() {
      interface TransitionData {
        lowerAreaData: QsAreaData
        upperAreaData: QsAreaData
      }

      const getVals = (): TransitionData => {
        const lowerData: number[] = []
        const higherData: number[] = []

        for (let i = 0; i < 12; i++) {
          let val1 = Math.round(Math.random() * 100)
          let val2 = Math.round(Math.random() * 100)

          lowerData.push(val1 < val2 ? val1 : val2)
          higherData.push(val1 > val2 ? val1 : val2)
        }

        const colors = ['red', 'blue', 'green', 'pink']
        const fillColor = colors[colorIndex.current]
        colorIndex.current = colorIndex.current > 2 ? 0 : colorIndex.current + 1
        const upperAreaData: QsAreaData = { lowerData, higherData, fillColor }
        const lowerAreaData: QsAreaData = { higherData: lowerData }

        return { lowerAreaData, upperAreaData }
      }

      const data = getVals()

      if (topArea) topArea.transition({ data: data.upperAreaData })
      if (bottomArea) bottomArea.transition({ data: data.lowerAreaData })

      setTimeout(() => setChanged(!changed), 3000)
    },
    [topArea, bottomArea, changed]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
