import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarGenerator,
  QsBars,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsTransition: FunctionComponent<OrienetedChartProps> = ({
  targetId,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 50,
    })
    let newBars: QsBars
    if (orientation === Orientation.VERTICAL) {
      newBars = linearBarGenerator.vertical(canvas, data)
    } else {
      newBars = linearBarGenerator.horizontal(canvas, data)
    }
    setBars(newBars)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): number[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push(num)
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === Orientation.VERTICAL) {
        if (bars) bars.transitionVertical(transitionData)
      } else {
        if (bars) bars.transitionHorizontal(transitionData)
      }

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
