import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarData,
  QsBars,
  QsTextData,
  QsText,
  QsPoints,
  QsLineData,
  QsLine,
  QsScaleType,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../common/chartProps'
import { EnumOrientation } from '../../common/enums'

export const LinearBarsTransition: FunctionComponent<OrienetedChartProps> = ({
  canvasProps,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()
  const [text, setText] = useState<QsText>()
  const [points, setPoints] = useState<QsPoints>()
  const [line, setLine] = useState<QsLine>()

  useEffect(() => {
    const createChart = () => {
      const data: QsBarData[] = [
        { upperBoundry: 25 },
        { upperBoundry: 10 },
        { upperBoundry: 35 },
        { upperBoundry: 25 },
        { upperBoundry: 35 },
        { upperBoundry: 5 },
        { upperBoundry: 25 },
        { upperBoundry: 25 },
        { upperBoundry: 25 },
        { upperBoundry: 10 },
        { upperBoundry: 35 },
        { upperBoundry: 25 },
        { upperBoundry: 35 },
        { upperBoundry: 5 },
        { upperBoundry: 25 },
        { upperBoundry: 25 },
        { upperBoundry: 25 },
        { upperBoundry: 10 },
        { upperBoundry: 35 },
        { upperBoundry: 25 },
      ]
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
      const lineData: QsLineData = {
        data: [
          25, 10, 35, 25, 35, 5, 25, 25, 25, 10, 35, 25, 35, 5, 25, 25, 25, 10,
          35, 25,
        ],
      }
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      let newBars: QsBars
      let newText: QsText
      let newPoints: QsPoints
      let newLine: QsLine

      if (orientation === EnumOrientation.VERTICAL) {
        newBars = canvas.generate.linear.vertical.bars(data)
        newPoints = canvas.generate.linear.vertical.pointsBanded(textData)
        newLine = canvas.generate.linear.vertical.lineBanded(lineData)
        newText = canvas.generate.linear.vertical.textBanded(textData)
      } else {
        newBars = canvas.generate.linear.horizontal.bars(data)
        newPoints = canvas.generate.linear.horizontal.pointsBanded(textData)
        newLine = canvas.generate.linear.horizontal.lineBanded(lineData)
        newText = canvas.generate.linear.horizontal.textBanded(textData)
        canvas.generate.linear.vertical.axis.left([])
        canvas.generate.linear.horizontal.axis.bottom(
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ],
          { domainScale: QsScaleType.BANDED }
        )
      }
      setBars(newBars)
      setPoints(newPoints)
      setText(newText)
      setLine(newLine)
    }
    createChart()
  }, [canvasProps, orientation])

  useEffect(
    function transitionData() {
      const getData = (): {
        barData: QsBarData[]
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
        return { barData, textData, lineData }
      }

      const transitionData = getData()

      if (bars) bars.transition({ data: transitionData.barData })
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
    [bars, changed, line, orientation, points, text]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
