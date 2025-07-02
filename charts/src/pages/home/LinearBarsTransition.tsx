import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsBarData,
  QsBars,
  QsTextData,
  QsText,
  QsEnumScaleType,
  QsEnumAxisScaleType,
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

  useEffect(() => {
    const createChart = () => {
      const data: QsBarData[] = [
        {
          upperBoundry: 25,
          topLeftCornerRadiusCx: 3,
          topLeftCornerRadiusCy: 3,
          topRightCornerRadiusCx: 3,
          topRightCornerRadiusCy: 3,
        },
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

      if (orientation === EnumOrientation.VERTICAL) {
        newBars = canvas.generate.linear.vertical.bars(data)

        newText = canvas.generate.linear.vertical.text(textData, {
          scaleType: QsEnumScaleType.BANDED,
        })
        canvas.generate.linear.vertical.axis.left(
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ],
          {
            domainScale: QsEnumAxisScaleType.BANDED,
          }
        )
        canvas.generate.linear.horizontal.axis.bottom([])
      } else {
        newBars = canvas.generate.linear.horizontal.bars(data)

        newText = canvas.generate.linear.horizontal.text(textData, {
          scaleType: QsEnumScaleType.BANDED,
        })
        canvas.generate.linear.vertical.axis.left([])
        canvas.generate.linear.horizontal.axis.bottom(
          [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ],
          { domainScale: QsEnumAxisScaleType.BANDED }
        )
      }
      setBars(newBars)
      setText(newText)
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
            topLeftCornerRadiusCx: 50,
            topLeftCornerRadiusCy: 1000,
            topRightCornerRadiusCx: 50,
            topRightCornerRadiusCy: 1000,
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
      if (text) text.transition({ data: transitionData.textData })

      setTimeout(() => setChanged(!changed), 2000)
    },
    [bars, changed, orientation, text]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
