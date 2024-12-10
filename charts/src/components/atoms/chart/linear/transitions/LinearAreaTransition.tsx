import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  createCanvas,
  linearAreaGenerator,
  QsArea,
  QsAreaData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const LinearAreaTransition: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [topArea, setTopArea] = useState<QsArea>()
  const [bottomArea, setBottomArea] = useState<QsArea>()

  const createChart = () => {
    const lowerData: number[] = [15, 10, 20, 30, 40, 26, 90, 15, 10, 30, 25, 50]
    const higherData: number[] = [
      25, 15, 40, 36, 80, 100, 96, 30, 100, 98, 100, 60,
    ]

    const dataUpper: QsAreaData = {
      lowerData,
      higherData,
    }
    const dataLower: QsAreaData = {
      higherData: lowerData,
    }

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 100,
    })

    let newTopArea = linearAreaGenerator.horizontal(canvas, dataUpper)
    let newBottomArea = linearAreaGenerator.horizontal(canvas, dataLower, {
      color: 'blue',
    })

    setTopArea(newTopArea)
    setBottomArea(newBottomArea)
  }

  useEffect(() => {
    createChart()
  }, [])

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
        const upperAreaData: QsAreaData = { lowerData, higherData }
        const lowerAreaData: QsAreaData = { higherData: lowerData }

        return { lowerAreaData, upperAreaData }
      }

      const data = getVals()

      if (topArea) topArea.transition(data.upperAreaData)
      if (bottomArea) bottomArea.transition(data.lowerAreaData)

      setTimeout(() => setChanged(!changed), 3000)
    },
    [topArea, bottomArea, changed]
  )

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
