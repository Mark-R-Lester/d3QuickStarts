import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, QsCoordinate, qsCreateCanvas } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedLineElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1: QsCoordinate[] = [
      { x: 15, y: 10 },
      { x: 20, y: 30 },
      { x: 40, y: 26 },
      { x: 90, y: 15 },
      { x: 102, y: 112 },
      { x: 156, y: 140 },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 156,
    })

    canvas.generate.plotted.line(data1)
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
