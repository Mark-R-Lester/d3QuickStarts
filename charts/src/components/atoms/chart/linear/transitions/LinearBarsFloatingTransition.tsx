import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearBarGenerator,
  QsBars,
  QsBarBoundries,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearBarsFloatingTransition: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  const createChart = () => {
    const data: QsBarBoundries[] = [
      {
        lowerBoundry: 10,
        upperBoundry: 30,
      },
      {
        lowerBoundry: 20,
        upperBoundry: 40,
      },
      {
        lowerBoundry: 30,
        upperBoundry: 50,
      },
      {
        lowerBoundry: 10,
        upperBoundry: 25,
      },
      {
        lowerBoundry: 10,
        upperBoundry: 12,
      },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 50,
    })

    let newBars
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
        const vals: QsBarBoundries[] = []
        for (let i = 0; i < 8; i++) {
          let val1 = (Math.random() * 100) / 2
          let val2 = (Math.random() * 100) / 2
          vals.push({
            lowerBoundry: val1 < val2 ? val1 : val2,
            upperBoundry: val1 > val2 ? val1 : val2,
          })
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
