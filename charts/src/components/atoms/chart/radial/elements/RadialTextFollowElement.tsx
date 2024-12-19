import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsRadialTextGenerator,
  QsValuedText,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/core/qsEnums'

export const RadialTextFollowElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1: QsValuedText[] = [
      {
        value: 10,
        text: 'Ten',
      },
      {
        value: 20,
        text: 'Twenty',
      },
      {
        value: 30,
        text: 'Thirty',
      },
      {
        value: 40,
        text: 'Forty',
      },
      {
        value: 50,
        text: 'Fifty',
      },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    qsRadialTextGenerator.follow(canvas, data1, {
      radius: 100,
      x: 50,
      y: 50,
      textFont: QsEnumTextFont.ARIAL,
      textFontSize: 6,
      textFontStyle: QsEnumTextFontStyle.ITALIC,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textDecorationLine: QsEnumTextDecorationLine.OVERLINE_UNDERLINE,
      textFill: 'orange',
      textStroke: 'purple',
      textAnchor: QsEnumTextAnchor.MIDDLE,
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
