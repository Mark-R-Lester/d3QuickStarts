import { FunctionComponent, memo, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsPoints,
  QsLineData,
  QsLine,
  QsEnumScaleType,
  QsEnumAxisScaleType,
  QsPointData,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../common/chartProps'
import { EnumOrientation } from '../../common/enums'

export const OrthogonalLine: FunctionComponent<OrienetedChartProps> = memo(
  ({ canvasProps, orientation }) => {
    const [changed, setChanged] = useState<boolean>(false)
    const [points, setPoints] = useState<QsPoints>()
    const [line, setLine] = useState<QsLine>()

    useEffect(() => {
      const createChart = () => {
        const pointData: QsPointData[] = [
          { value: 25 },
          { value: 10 },
          { value: 35 },
          { value: 25 },
          { value: 35 },
          { value: 5 },
          { value: 25 },
          { value: 25 },
          { value: 25 },
          { value: 10 },
          { value: 35 },
          { value: 25 },
          { value: 35 },
          { value: 5 },
          { value: 25 },
          { value: 25 },
          { value: 25 },
          { value: 10 },
          { value: 35 },
          { value: 25 },
        ]
        const lineData: QsLineData = {
          data: [
            25, 10, 35, 25, 35, 5, 25, 25, 25, 10, 35, 25, 35, 5, 25, 25, 25,
            10, 35, 25,
          ],
        }

        const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)
        let newPoints: QsPoints
        let newLine: QsLine

        if (orientation === EnumOrientation.VERTICAL) {
          newPoints = canvas.generate.orthogonal.vertical.points(pointData, {
            scaleType: QsEnumScaleType.BANDED,
          })

          newLine = canvas.generate.orthogonal.vertical.line(lineData, {
            scaleType: QsEnumScaleType.BANDED,
          })
        } else {
          newLine = canvas.generate.orthogonal.horizontal.line(lineData)
          newPoints = canvas.generate.orthogonal.horizontal.points(pointData)

          canvas.generate.orthogonal.vertical.axis.left([])
          canvas.generate.orthogonal.horizontal.axis.bottom(
            [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20,
            ],
            { domainScale: QsEnumAxisScaleType.POINT }
          )
        }
        setPoints(newPoints)

        setLine(newLine)
      }
      createChart()
    }, [canvasProps, orientation])

    useEffect(
      function transitionData() {
        const getData = (): {
          pointData: QsPointData[]
          lineData: number[]
        } => {
          const pointData = []
          const lineData = []
          for (let i = 0; i < 20; i++) {
            let num = (Math.random() * 100) / 2
            pointData.push({
              value: num,
            })
            lineData.push(num)
          }
          return { pointData: pointData, lineData }
        }

        const transitionData = getData()

        if (points) points.transition({ data: transitionData.pointData })
        if (line)
          line.transition({
            data: {
              data: transitionData.lineData,
            },
          })

        setTimeout(() => setChanged(!changed), 2000)
      },
      [changed, line, orientation, points]
    )

    return (
      <>
        <div id={canvasProps.chartName}></div>
      </>
    )
  }
)
