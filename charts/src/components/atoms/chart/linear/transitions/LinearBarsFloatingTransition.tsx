import { FunctionComponent, useEffect, useState } from 'react'
import { QsCanvas, qsCreateCanvas, QsBars, QsBarData } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'
import { QsEnumColorScale } from 'd3qs/core/qsEnums'

export const LinearBarsFloatingTransition: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  useEffect(() => {
    const createChart = () => {
      const data: QsBarData[] = [
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
      if (orientation === EnumOrientation.VERTICAL) {
        newBars = canvas.generate.linear.vertical.bars(data, {
          fillColorScaleData: {
            range: ['green', 'orange', 'red'],
            domain: [1, 70],
            type: QsEnumColorScale.ORDINAL,
          },
        })
      } else {
        newBars = canvas.generate.linear.horizontal.bars(data, {
          fillColorScaleData: {
            range: ['lightblue', 'steelblue', 'blue', 'darkblue'],
            domain: [1, 70],
            type: QsEnumColorScale.SEQUENTIAL,
          },
        })
      }
      setBars(newBars)
    }
    createChart()
  }, [chartName, orientation])

  useEffect(
    function transitionData() {
      const getVals = (): QsBarData[] => {
        const vals: QsBarData[] = []
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
      if (orientation === EnumOrientation.VERTICAL) {
        if (bars) bars.transition({ data: transitionData })
      } else {
        if (bars) bars.transition({ data: transitionData })
      }

      setTimeout(() => setChanged(!changed), 3000)
    },
    [bars, changed, orientation]
  )

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
