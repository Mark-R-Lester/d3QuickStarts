import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  createCanvas,
  linearBarFloatingGenerator,
  QsBarsFloating,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsFloatingTransition: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBarsFloating>()

  const createChart = () => {
    const data = [
      [10, 30],
      [20, 40],
      [30, 50],
      [10, 25],
      [10, 12],
    ]
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 50,
    })

    let newBars
    if (orientation === Orientation.VERTICAL) {
      newBars = linearBarFloatingGenerator.vertical(canvas, data)
    } else {
      newBars = linearBarFloatingGenerator.horizontal(canvas, data)
    }
    setBars(newBars)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): number[][] => {
        const vals: number[][] = []
        for (let i = 0; i < 8; i++) {
          let val1 = (Math.random() * 100) / 2
          let val2 = (Math.random() * 100) / 2
          vals.push([val1 < val2 ? val1 : val2, val1 > val2 ? val1 : val2])
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === Orientation.VERTICAL) {
        if (bars) bars.transition(transitionData)
      } else {
        if (bars) bars.transition(transitionData)
      }

      setTimeout(() => setChanged(!changed), 3000)
    },
    [bars, changed]
  )

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
