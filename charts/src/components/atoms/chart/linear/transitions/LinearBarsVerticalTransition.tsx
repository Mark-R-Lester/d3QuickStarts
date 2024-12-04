import { FunctionComponent, useEffect, useState } from 'react'
import {
  Canvas,
  createCanvas,
  linearBarGenerator,
  QsBars,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearBarsVerticalTransition: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      highestViewableValue: 50,
    })
    const newBars = linearBarGenerator.vertical(canvas, data)
    setBars(newBars)
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(() => {
    const getVals = (): number[] => {
      const vals = []
      for (let i = 0; i < 8; i++) {
        let num = (Math.random() * 100) / 2
        vals.push(num)
      }
      return vals
    }

    const transitionData = getVals()
    if (bars) bars.transitionVertical(transitionData)
    setTimeout(() => setChanged(!changed), 5000)
  }, [bars, changed])

  return (
    <>
      <div id={targetId}></div>
    </>
  )
}
