import { FunctionComponent, useEffect } from 'react'
import {
  QsBarData,
  QsCanvas,
  qsCreateCanvas,
  QsEnumColorScale,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearFloatingBarsElement: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const createChart = () => {
    const data: QsBarData[] = [
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

    if (orientation === EnumOrientation.VERTICAL) {
      data[0].strokeColor = 'black'
      data[0].strokeWidth = 2
      canvas.generate.linear.vertical.bars(data, {
        defaultStrokeWidth: 1,
        defaultStrokeColor: 'orange',
        fillColorScaleData: {
          range: ['green', 'orange', 'red'],
          domain: [1, 70],
          type: QsEnumColorScale.ORDINAL,
        },
      })
    } else {
      canvas.generate.linear.horizontal.bars(data, {
        fillColorScaleData: {
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
