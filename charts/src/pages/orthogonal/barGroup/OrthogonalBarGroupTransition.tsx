import { FunctionComponent, useEffect, useState, useMemo } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsBarGroups,
  QsBarStackedData,
  QsBarStack,
  QsBarGroupedData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalBarGroupTransition: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasConfig }) => {
  const [changedStack, setChangedStack] = useState<boolean>(false)
  const [changedGroup, setChangedGroup] = useState<boolean>(false)
  const [grouped, setGrouped] = useState<QsBarGroups>()
  const [stacked, setStacked] = useState<QsBarStack>()
  const dataMin: QsBarGroupedData[][] = useMemo(
    () => [
      [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
      [{ value: 16 }, { value: 32 }, { value: 30 }, { value: 26 }],
      [{ value: 40 }, { value: 16 }, { value: 12 }, { value: 16 }],
      [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
      [{ value: 10 }, { value: 37 }, { value: 21 }, { value: 8 }],
      [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
      [{ value: 10 }, { value: 32 }, { value: 30 }, { value: 26 }],
      [{ value: 15 }, { value: 16 }, { value: 12 }, { value: 16 }],
      [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
    ],
    []
  )

  const dataMax: QsBarStackedData[][] = useMemo(
    () => [
      [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
      [{ value: 16 }, { value: 32 }, { value: 30 }, { value: 26 }],
      [{ value: 40 }, { value: 16 }, { value: 12 }, { value: 16 }],
      [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
      [{ value: 10 }, { value: 37 }, { value: 21 }, { value: 8 }],
      [{ value: 10 }, { value: 20 }, { value: 16 }, { value: 23 }],
      [{ value: 10 }, { value: 32 }, { value: 30 }, { value: 26 }],
      [{ value: 15 }, { value: 16 }, { value: 12 }, { value: 16 }],
      [{ value: 10 }, { value: 4 }, { value: 13 }, { value: 32 }],
    ],
    []
  )

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      let grouped = canvas.generate.orthogonal.horizontal.barGroup(dataMin)
      let stacked = canvas.generate.orthogonal.horizontal.barStack(dataMax)

      setGrouped(grouped)
      setStacked(stacked)
    }
    createChart()
  }, [canvasConfig, dataMax, dataMin])

  useEffect(
    function transitionGrouped() {
      if (changedGroup) {
        if (grouped)
          grouped.transition({
            data: dataMin,
          })
      } else {
        if (grouped)
          grouped.transition({
            data: dataMin,
          })
      }
      setTimeout(() => setChangedGroup(!changedGroup), 3000)
    },
    [grouped, changedGroup, dataMax, dataMin]
  )

  useEffect(
    function transitionStacked() {
      if (changedGroup) {
        if (grouped)
          grouped.transition({
            data: dataMin,
          })
      } else {
        if (grouped)
          grouped.transition({
            data: dataMin,
          })
      }
      setTimeout(() => setChangedStack(!changedStack), 3000)
    },
    [stacked, changedStack, dataMin, dataMax, changedGroup, grouped]
  )

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
