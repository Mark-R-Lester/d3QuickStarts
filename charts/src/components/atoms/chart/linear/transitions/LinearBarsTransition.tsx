import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  createCanvas,
  qsLinearBarGenerator,
  QsBars,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsTransition: FunctionComponent<OrienetedChartProps> = ({
  chartName,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  const createChart = () => {
    const data = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 50,
    })
    let newBars: QsBars
    if (orientation === Orientation.VERTICAL) {
      newBars = qsLinearBarGenerator.vertical(canvas, data)
    } else {
      newBars = qsLinearBarGenerator.horizontal(canvas, data)
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
