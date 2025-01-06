import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadialArea,
  QsRadialAreaData,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import { QsEnumCurve } from 'd3qs/core/enums/qsEnums'

export const RadialAreaTransition: FunctionComponent<ChartProps> = ({
  chartName,
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
        fillColor: 'blue',
      }
      const dataLower: QsRadialAreaData = {
        outerData: innerData,
      }

      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 600,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      })

      let newTopArea = canvas.generate.radial.area(dataUpper, {
        curve: QsEnumCurve.BASIS,
      })
      let newBottomArea = canvas.generate.radial.area(dataLower, {
        curve: QsEnumCurve.BASIS,
      })

      setTopArea(newTopArea)
      setBottomArea(newBottomArea)
    }
    createChart()
  }, [chartName])

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
        const upperAreaData: QsRadialAreaData = { innerData, outerData }
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
      <div id={chartName}></div>
    </>
  )
}
