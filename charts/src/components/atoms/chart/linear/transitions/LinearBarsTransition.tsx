import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarBoundries,
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
    const data: QsBarBoundries[] = [
      { upperBoundry: 25 },
      { upperBoundry: 10 },
      { upperBoundry: 35 },
      { upperBoundry: 25 },
      { upperBoundry: 35 },
      { upperBoundry: 5 },
      { upperBoundry: 25 },
      { upperBoundry: 25 },
    ]
    const canvas: QsCanvas = qsCreateCanvas({
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
      const getVals = (): QsBarBoundries[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ upperBoundry: num })
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === Orientation.VERTICAL) {
        if (bars) bars.transition({ data: transitionData })
      } else {
        if (bars) bars.transition({ data: transitionData })
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
