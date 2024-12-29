import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearPointGenerator,
  QsPoints,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { PointChartProps } from '../../../../../common/chartProps'
import { QsPointData } from 'd3qs/linear/points/types'

export const LinearPointsTransition: FunctionComponent<PointChartProps> = ({
  chartName,
  data,
  config,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsPoints>()
  const createChart = () => {
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 50,
    })
    let newElement: QsPoints
    if (orientation === EnumOrientation.VERTICAL) {
      newElement = qsLinearPointGenerator.vertical(canvas, data, config)
    } else {
      newElement = qsLinearPointGenerator.horizontal(canvas, data, config)
    }
    setElement(newElement)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): QsPointData[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ value: num })
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === EnumOrientation.VERTICAL) {
        if (element) element.transition({ data: transitionData })
      } else {
        if (element) element.transition({ data: transitionData })
      }

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
