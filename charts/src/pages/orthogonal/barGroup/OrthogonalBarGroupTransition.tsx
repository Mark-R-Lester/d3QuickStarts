import { FunctionComponent, useEffect, useState, useMemo } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvas,
  QsBarGroups,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const OrthogonalBarGroupTransition: FunctionComponent<
  ChartPropsOthogonal
> = ({ canvasProps }) => {
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
      const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasProps)

      let grouped = canvas.generate.orthogonal.horizontal.barGroup({
        data: dataMax,
      })
      let stacked = canvas.generate.orthogonal.horizontal.barStack({
        data: dataMin,
      })

      setGrouped(grouped)
      setStacked(stacked)
    }
    createChart()
  }, [canvasProps, dataMax, dataMin])

  useEffect(
    function transitionGrouped() {
      if (changedGroup) {
        if (grouped)
          grouped.transition({
            data: {
              data: dataMin,
            },
          })
      } else {
        if (grouped)
          grouped.transition({
            data: {
              data: dataMin,
            },
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
            data: {
              data: dataMin,
            },
          })
      } else {
        if (grouped)
          grouped.transition({
            data: {
              data: dataMin,
            },
          })
      }
      setTimeout(() => setChangedStack(!changedStack), 3000)
    },
    [stacked, changedStack, dataMin, dataMax, changedGroup, grouped]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
