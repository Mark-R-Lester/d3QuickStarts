import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarGroups,
  qsFindMaxSum,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const LinearBarGroupTransition: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const [changedStack, setChangedStack] = useState<boolean>(false)
  const [changedGroup, setChangedGroup] = useState<boolean>(false)
  const [grouped, setGrouped] = useState<QsBarGroups>()
  const [stacked, setStacked] = useState<QsBarGroups>()
  const dataMin: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]

  const dataMax: number[][] = [
    [10, 20, 16, 23],
    [16, 32, 30, 26],
    [40, 16, 12, 16],
    [10, 4, 13, 32],
    [10, 37, 21, 8],
    [10, 20, 16, 23],
    [10, 32, 30, 26],
    [15, 16, 12, 16],
    [10, 4, 13, 32],
    [19, 37, 21, 8],
    [15, 20, 16, 23],
    [11, 32, 30, 26],
    [10, 16, 12, 16],
    [6, 4, 13, 3],
  ]

  const createChart = () => {
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: qsFindMaxSum(dataMax),
    })

    let grouped = canvas.generate.linear.horizontal.barGroup(dataMax)
    let stacked = canvas.generate.linear.horizontal.barStack(dataMin)

    setGrouped(grouped)
    setStacked(stacked)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionGrouped() {
      if (changedGroup) {
        if (grouped) grouped.transition({ data: dataMax })
      } else {
        if (grouped) grouped.transition({ data: dataMin })
      }
      setTimeout(() => setChangedGroup(!changedGroup), 3000)
    },
    [grouped, changedGroup]
  )

  useEffect(
    function transitionStacked() {
      if (changedStack) {
        if (stacked) stacked.transition({ data: dataMin })
      } else {
        if (stacked) stacked.transition({ data: dataMax })
      }
      setTimeout(() => setChangedStack(!changedStack), 3000)
    },
    [stacked, changedStack]
  )

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
