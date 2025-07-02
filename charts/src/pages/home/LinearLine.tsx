import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsTextData,
  QsText,
  QsPoints,
  QsLineData,
  QsLine,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../common/chartProps'
import { EnumOrientation } from '../../common/enums'

export const LinearLine: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [text, setText] = useState<QsText>()
  const [points, setPoints] = useState<QsPoints>()
  const [line, setLine] = useState<QsLine>()

  useEffect(() => {
    const createChart = () => {
      const textData: QsTextData[] = [
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
      const pointData: QsTextData[] = [
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
        { value: 10 },
      ]
      const lineData: QsLineData = {
        data: [
          25, 10, 35, 25, 35, 5, 25, 25, 25, 10, 35, 25, 35, 5, 25, 25, 25, 10,
          35, 25,
        ],
      }

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      let newText: QsText
      let newPoints: QsPoints
      let newLine: QsLine

      if (orientation === EnumOrientation.VERTICAL) {
        newPoints = canvas.generate.linear.vertical.points(textData, {
          scaleType: QsEnumScaleType.BANDED,
        })
        canvas.generate.linear.vertical.points(pointData, {
          scaleType: QsEnumScaleType.BANDED,
        })
        newLine = canvas.generate.linear.vertical.line(lineData, {
          scaleType: QsEnumScaleType.BANDED,
        })
        newText = canvas.generate.linear.vertical.text(textData, {
          scaleType: QsEnumScaleType.BANDED,
        })
      } else {
        newPoints = canvas.generate.linear.horizontal.points(textData)
        canvas.generate.linear.horizontal.points(pointData)
        newLine = canvas.generate.linear.horizontal.line(lineData)
        newText = canvas.generate.linear.horizontal.text(textData)
        canvas.generate.linear.vertical.axis.left([])
        canvas.generate.linear.horizontal.axis.bottom([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ])
      }
      setPoints(newPoints)
      setText(newText)
      setLine(newLine)
    }
    createChart()
  }, [canvasProps, orientation])

  useEffect(
    function transitionData() {
      const getData = (): {
        textData: QsTextData[]
        lineData: number[]
      } => {
        const barData = []
        const textData = []
        const lineData = []
        for (let i = 0; i < 20; i++) {
          let num = (Math.random() * 100) / 2
          barData.push({
            upperBoundry: num,
            fillColor: num < 25 ? 'green' : 'red',
          })
          textData.push({
            value: num,
          })
          lineData.push(num)
        }
        return { textData, lineData }
      }

      const transitionData = getData()

      if (points) points.transition({ data: transitionData.textData })
      if (text) text.transition({ data: transitionData.textData })
      if (line)
        line.transition({
          data: {
            data: transitionData.lineData,
          },
        })

      setTimeout(() => setChanged(!changed), 2000)
    },
    [changed, line, orientation, points, text]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
