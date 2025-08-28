import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  QsCanvasPlotted,
  qsCreateCanvasOrthogonal,
  qsCreateCanvasPlotted,
  QsEnumCurve,
  QsEnumLineCap,
  QsEnumLineJoin,
  QsLineData,
  QsPlottedLineData,
} from 'd3qs/d3QuickStart'

export enum EnumType {
  CURVE,
  JOIN,
  CAP,
}

export interface LineEnumDemoChartProps {
  chartName: string
  type: EnumType
  height?: number
  width?: number
  curve?: QsEnumCurve
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}

export const LineEnumDemoChart: FunctionComponent<LineEnumDemoChartProps> = ({
  chartName,
  type,
  height = 70,
  width = 500,
  curve = QsEnumCurve.LINEAR,
  strokeLineJoin = QsEnumLineJoin.ROUND,
  strokeLineCap = QsEnumLineCap.ROUND,
}: LineEnumDemoChartProps) => {
  useEffect(() => {
    const createChart = () => {
      if (type === EnumType.CAP || type === EnumType.JOIN) {
        const canvas: QsCanvasPlotted = qsCreateCanvasPlotted({
          chartName: `lineEnumDemo${chartName}`,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          height,
          width,
          highestViewableValueX: 100,
          highestViewableValueY: 100,
        })

        const horizontalLine: QsPlottedLineData = {
          coordinates:
            type === EnumType.CAP
              ? [
                  { x: 30, y: 50 },
                  { x: 70, y: 50 },
                ]
              : [
                  { x: 40, y: 20 },
                  { x: 50, y: 75 },
                  { x: 60, y: 20 },
                ],
        }

        canvas.generate.plotted.line(horizontalLine, {
          defaultStrokeWidth: 40,
          ...(type === EnumType.CAP ? { strokeLineCap } : { strokeLineJoin }),
        })
      }

      if (type === EnumType.CURVE) {
        const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal({
          chartName: `lineEnumDemo${chartName}`,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          height,
          width,
          highestViewableValue: 100,
        })
        const horizontalLine: QsLineData = {
          values: [10, 20, 50, 10, 90, 30, 60, 95, 85, 10],
        }
        canvas.generate.orthogonal.horizontal.line(horizontalLine, {
          defaultStrokeWidth: 2,
          curve,
        })
      }
    }
    createChart()
  }, [chartName, curve, height, strokeLineCap, strokeLineJoin, type, width])

  return (
    <>
      <div id={`lineEnumDemo${chartName}`}></div>
    </>
  )
}
