import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearBarGenerator,
} from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'
import { QsEnumColorScale } from 'd3qs/core/qsEnums'

export const LinearFloatingBarsElement: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const createChart = () => {
    const data2 = [
      {
        lowerBoundry: 0,
        upperBoundry: 10,
      },
      {
        lowerBoundry: 10,
        upperBoundry: 20,
      },

      {
        lowerBoundry: 50,
        upperBoundry: 70,
      },
      {
        lowerBoundry: 20,
        upperBoundry: 40,
      },
      {
        lowerBoundry: 30,
        upperBoundry: 50,
      },
    ]
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 70,
    })

    if (orientation === Orientation.VERTICAL) {
      qsLinearBarGenerator.vertical(canvas, data2, {
        color: {
          range: ['green', 'orange', 'red'],
          domain: [1, 70],
          type: QsEnumColorScale.ORDINAL,
        },
      })
    } else {
      qsLinearBarGenerator.horizontal(canvas, data2, {
        color: {
          range: ['lightblue', 'steelblue', 'blue'],
          domain: [1, 70],
          type: QsEnumColorScale.SEQUENTIAL,
        },
      })
    }
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
