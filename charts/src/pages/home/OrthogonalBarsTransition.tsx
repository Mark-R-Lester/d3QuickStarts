import { FunctionComponent, memo, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsBarData,
  QsBars,
  QsTextData,
  QsText,
  QsEnumScaleType,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../common/chartProps'

export const OrthogonalBarsTransition: FunctionComponent<OrienetedChartProps> =
  memo(({ canvasConfig, orientation }) => {
    const [changed, setChanged] = useState<boolean>(false)
    const [bars, setBars] = useState<QsBars>()
    const [text, setText] = useState<QsText>()

    useEffect(() => {
      const createChart = () => {
        const data: QsBarData[] = [
          {
            highValue: 25,
            topLeftCornerRadiusCx: 3,
            topLeftCornerRadiusCy: 3,
            topRightCornerRadiusCx: 3,
            topRightCornerRadiusCy: 3,
          },
          { highValue: 10 },
          { highValue: 35 },
          { highValue: 25 },
          { highValue: 35 },
          { highValue: 5 },
          { highValue: 25 },
          { highValue: 25 },
          { highValue: 25 },
          { highValue: 10 },
          { highValue: 35 },
          { highValue: 25 },
          { highValue: 35 },
          { highValue: 5 },
          { highValue: 25 },
          { highValue: 25 },
          { highValue: 25 },
          { highValue: 10 },
          { highValue: 35 },
          { highValue: 25 },
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

        const canvas: QsCanvasOrthogonal =
          qsCreateCanvasOrthogonal(canvasConfig)
        let newBars: QsBars
        let newText: QsText

        canvas.generate.orthogonal.vertical.axis.left({
          tickSizeInner: -100,
          tickWidth: 0.9,
          domainWidth: 1.5,
          domainColor: 'black',
          tickColor: 'white',
          textFill: 'blue',
        })
        newBars = canvas.generate.orthogonal.horizontal.bars(data)
        newText = canvas.generate.orthogonal.horizontal.text(textData, {
          scaleType: QsEnumScaleType.BANDED,
          defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
          fixedPositionActive: true,
          fixedPosition: -4,
        })

        setBars(newBars)
        setText(newText)
      }
      createChart()
    }, [canvasConfig, orientation])

    useEffect(
      function transitionData() {
        const getData = (): {
          barData: QsBarData[]
          textData: QsTextData[]
        } => {
          const barData = []
          const textData = []
          for (let i = 0; i < 20; i++) {
            let num = (Math.random() * 100) / 2
            barData.push({
              highValue: num,
              fillColor: num < 25 ? 'blue' : 'darkblue',
              topLeftCornerRadiusCx: 50,
              topLeftCornerRadiusCy: 1000,
              topRightCornerRadiusCx: 50,
              topRightCornerRadiusCy: 1000,
            })
            textData.push({
              value: num,
              positionalValue: num / 4,
            })
          }
          return { barData, textData }
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
        <div id={canvasConfig.chartName}></div>
      </>
    )
  })
