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
  ({ canvasConfig, orientation }) => {
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

        const canvas: QsCanvasOrthogonal =
          qsCreateCanvasOrthogonal(canvasConfig)
        let newPoints: QsPoints
        let newLine: QsLine

        newLine = canvas.generate.orthogonal.horizontal.line(lineData)
        newPoints = canvas.generate.orthogonal.horizontal.points(pointData)

        canvas.generate.orthogonal.vertical.axis.left({
          tickSizeInner: -100,
          tickWidth: 0.5,
          domainWidth: 0.9,
          numberOfTicks: 5,
        })

        setPoints(newPoints)
        setLine(newLine)
      }
      createChart()
    }, [canvasConfig, orientation])

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
        <div id={canvasConfig.chartName}></div>
      </>
    )
  }
)
