import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadialArea,
  QsRadialAreaData,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialAreaTransition: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [topArea, setTopArea] = useState<QsRadialArea>()
  const [bottomArea, setBottomArea] = useState<QsRadialArea>()

  useEffect(() => {
    const createChart = () => {
      const lowValues: number[] = [
        15, 10, 20, 30, 40, 26, 90, 15, 10, 30, 25, 50,
      ]
      const highValues: number[] = [
        25, 15, 40, 36, 80, 100, 96, 30, 100, 98, 100, 60,
      ]

      const dataUpper: QsRadialAreaData = {
        lowValues,
        highValues,
      }
      const dataLower: QsRadialAreaData = {
        highValues: lowValues,
      }

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

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
  }, [canvasConfig])

  useEffect(
    function transitionData() {
      interface TransitionData {
        lowerAreaData: QsRadialAreaData
        upperAreaData: QsRadialAreaData
      }

      const getVals = (): TransitionData => {
        const lowValues: number[] = []
        const highValues: number[] = []

        for (let i = 0; i < 12; i++) {
          let val1 = Math.round(Math.random() * 100)
          let val2 = Math.round(Math.random() * 100)

          lowValues.push(val1 < val2 ? val1 : val2)
          highValues.push(val1 > val2 ? val1 : val2)
        }
        const upperAreaData: QsRadialAreaData = {
          lowValues,
          highValues,
        }
        const lowerAreaData: QsRadialAreaData = { highValues: lowValues }

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
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
