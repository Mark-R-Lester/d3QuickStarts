import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsRadialAreaData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialAreaElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1: QsRadialAreaData = {
      innerData: [
        15, 15, 15, 17, 16, 21, 14, 15, 16, 12, 15, 15, 15, 17, 16, 15, 15, 15,
        17, 16, 21, 14, 15, 16, 12, 15,
      ],
      outerData: [
        16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 20, 17, 16, 17, 18,
        20, 17, 23, 23, 20, 17, 16, 16,
      ],
    }

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 25,
    })

    canvas.generate.radialCentroid.area(data1)
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
