import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialSpokesElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      })

      const numberOfSpokes = 6
      canvas.generate.radialCentroid.spokes(numberOfSpokes)
    }
    createChart()
  }, [chartName])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
