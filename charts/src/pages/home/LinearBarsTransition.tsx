import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarData,
  QsBars,
  QsTextData,
  QsText,
  QsPoints,
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
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      let newBars: QsBars
      let newText: QsText
      let newPoints: QsPoints

      if (orientation === EnumOrientation.VERTICAL) {
        newBars = canvas.generate.linear.vertical.bars(data)
        newPoints = canvas.generate.linear.horizontal.pointsBanded(textData)
        newText = canvas.generate.linear.horizontal.textBanded(textData)
      } else {
        newBars = canvas.generate.linear.horizontal.bars(data)
        newPoints = canvas.generate.linear.horizontal.pointsBanded(textData)
        newText = canvas.generate.linear.horizontal.textBanded(textData)
        canvas.generate.linear.vertical.axis.left([0, 35])
        canvas.generate.linear.horizontal.axis.bottomBanded([
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ])
      }
      setBars(newBars)
      setPoints(newPoints)
      setText(newText)
    }
    createChart()
  }, [canvasProps, orientation])

  useEffect(
    function transitionData() {
      const getData = (): { barData: QsBarData[]; textData: QsTextData[] } => {
        const barData = []
        const textData = []
        for (let i = 0; i < 20; i++) {
          let num = (Math.random() * 100) / 2
          barData.push({
            upperBoundry: num,
            fillColor: num < 25 ? 'green' : 'red',
          })
          textData.push({
            value: num,
          })
        }
        return { barData, textData }
      }

      const transitionData = getData()
      if (orientation === EnumOrientation.VERTICAL) {
        if (bars) bars.transition({ data: transitionData.barData })
        if (points) points.transition({ data: transitionData.textData })
        if (text) text.transition({ data: transitionData.textData })
      } else {
        if (bars) bars.transition({ data: transitionData.barData })
        if (points) points.transition({ data: transitionData.textData })
        if (text) text.transition({ data: transitionData.textData })
      }

      setTimeout(() => setChanged(!changed), 2000)
    },
    [bars, changed, orientation, points, text]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
