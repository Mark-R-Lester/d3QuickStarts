import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, createCanvas, qsLinearBarGenerator } from 'd3qs/d3QuickStart'
import { Orientation } from '../../../../../common/enums'
import { OrienetedChartProps } from '../../../../../common/chartProps'

export const LinearFloatingBarsElement: FunctionComponent<
  OrienetedChartProps
> = ({ chartName, orientation }) => {
  const createChart = () => {
    const data2 = [
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
        lowerBoundry: 40,
        upperBoundry: 60,
      },
      {
        lowerBoundry: 50,
        upperBoundry: 70,
      },
    ]
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 70,
    })

    if (orientation === Orientation.VERTICAL) {
      qsLinearBarGenerator.vertical(canvas, data2)
    } else {
      qsLinearBarGenerator.horizontal(canvas, data2)
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
