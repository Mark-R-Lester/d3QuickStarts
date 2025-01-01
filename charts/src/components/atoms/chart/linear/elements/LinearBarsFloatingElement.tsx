import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
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

    if (orientation === EnumOrientation.VERTICAL) {
      canvas.generate.linear.vertical.bars(data2, {
        colorScaleData: {
          range: ['green', 'orange', 'red'],
          domain: [1, 70],
          type: QsEnumColorScale.ORDINAL,
        },
      })
    } else {
      canvas.generate.linear.horizontal.bars(data2, {
        colorScaleData: {
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
