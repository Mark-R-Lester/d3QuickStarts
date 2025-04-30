import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedLineData,
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedLineElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
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

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      canvas.generate.plotted.line(data, {
        curve: QsEnumCurve.LINEAR,
        strokeLineJoin: QsEnumLineJoin.BEVEL,
        strokeLineCap: QsEnumLineCap.ROUND,
      })
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
