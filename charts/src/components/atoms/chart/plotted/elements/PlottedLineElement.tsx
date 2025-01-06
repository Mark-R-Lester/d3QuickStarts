import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsPlottedLineData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from 'd3qs/core/enums/qsEnums'

export const PlottedLineElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsPlottedLineData = {
      coordinates: [
        { x: 15, y: 10 },
        { x: 20, y: 30 },
        { x: 40, y: 26 },
        { x: 90, y: 15 },
        { x: 102, y: 112 },
        { x: 156, y: 140 },
      ],
      strokeColor: 'blue',
      strokeWidth: 10,
    }

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 1200,
      lowestViewableValue: 0,
      highestViewableValue: 156,
    })

    canvas.generate.plotted.line(data, {
      curve: QsEnumCurve.LINEAR,
      strokeLineJoin: QsEnumLineJoin.BEVEL,
      strokeLineCap: QsEnumLineCap.ROUND,
    })
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
