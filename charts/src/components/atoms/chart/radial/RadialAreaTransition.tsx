import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialArea,
  QsRadialAreaData,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/chartProps'

export const RadialAreaTransition: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [topArea, setTopArea] = useState<QsRadialArea>()
  const [bottomArea, setBottomArea] = useState<QsRadialArea>()

  useEffect(() => {
    const createChart = () => {
      const innerData: number[] = [
        15, 10, 20, 30, 40, 26, 90, 15, 10, 30, 25, 50,
      ]
      const outerData: number[] = [
        25, 15, 40, 36, 80, 100, 96, 30, 100, 98, 100, 60,
      ]

      const dataUpper: QsRadialAreaData = {
        innerData,
        outerData,
      }
      const dataLower: QsRadialAreaData = {
        outerData: innerData,
      }

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      let newTopArea = canvas.generate.radialCentroid.area(dataUpper, {
        curve: QsEnumCurve.BASIS,
        defaultFillColor: 'blue',
      })
      let newBottomArea = canvas.generate.radialCentroid.area(dataLower, {
        curve: QsEnumCurve.BASIS,
      })

      setTopArea(newTopArea)
      setBottomArea(newBottomArea)
    }
    createChart()
  }, [canvasProps])

  useEffect(
    function transitionData() {
      interface TransitionData {
        lowerAreaData: QsRadialAreaData
        upperAreaData: QsRadialAreaData
      }

      const getVals = (): TransitionData => {
        const innerData: number[] = []
        const outerData: number[] = []

        for (let i = 0; i < 12; i++) {
          let val1 = Math.round(Math.random() * 100)
          let val2 = Math.round(Math.random() * 100)

          innerData.push(val1 < val2 ? val1 : val2)
          outerData.push(val1 > val2 ? val1 : val2)
        }
        const upperAreaData: QsRadialAreaData = {
          innerData,
          outerData,
        }
        const lowerAreaData: QsRadialAreaData = { outerData: innerData }

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
