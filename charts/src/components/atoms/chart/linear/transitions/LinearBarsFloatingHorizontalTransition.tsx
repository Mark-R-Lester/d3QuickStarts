import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarFloatingGenerator,
  QsBarsFloating,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/types/chartProps'

export const LinearBarsFloatingHorizontalTransition: FunctionComponent<
  ChartProps
> = ({ targetId }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBarsFloating>()

  const createChart = () => {
    const data = [
      [10, 30],
      [20, 40],
      [30, 50],
      [40, 60],
      [50, 70],
    ]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 50,
    })
    const newBars = linearBarFloatingGenerator.horizontal(canvas, data)
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
      if (bars) bars.transitionVertical(transitionData)
      setTimeout(() => setChanged(!changed), 3000)
    },
    [bars, changed]
  )

  return (
    <>
      <div id={targetId}></div>
    </>
  )
}
