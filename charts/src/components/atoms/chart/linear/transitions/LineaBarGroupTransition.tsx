import { FunctionComponent, useEffect, useState, useMemo } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarGroups,
  qsFindMaxSum,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const LinearBarGroupTransition: FunctionComponent<ChartProps> = ({
  chartName,
  chartWidth,
}) => {
  const [changedStack, setChangedStack] = useState<boolean>(false)
  const [changedGroup, setChangedGroup] = useState<boolean>(false)
  const [grouped, setGrouped] = useState<QsBarGroups>()
  const [stacked, setStacked] = useState<QsBarGroups>()
  const dataMin: number[][] = useMemo(
    () => [
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
    ],
    []
  )

  const dataMax: number[][] = useMemo(
    () => [
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
    ],
    []
  )

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: chartWidth,
        lowestViewableValue: 0,
        highestViewableValue: qsFindMaxSum(dataMax),
      })

      let grouped = canvas.generate.linear.horizontal.barGroup(dataMax)
      let stacked = canvas.generate.linear.horizontal.barStack(dataMin)

      setGrouped(grouped)
      setStacked(stacked)
    }
    createChart()
  }, [chartName, chartWidth, dataMax, dataMin])

  useEffect(
    function transitionGrouped() {
      if (changedGroup) {
        if (grouped) grouped.transition({ data: dataMax })
      } else {
        if (grouped) grouped.transition({ data: dataMin })
      }
      setTimeout(() => setChangedGroup(!changedGroup), 3000)
    },
    [grouped, changedGroup, dataMax, dataMin]
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
    [stacked, changedStack, dataMin, dataMax]
  )

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
