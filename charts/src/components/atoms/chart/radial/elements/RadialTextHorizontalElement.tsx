import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsValuedText } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/core/qsEnums'

export const RadialTextHorizontalElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsValuedText[] = [
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

    canvas.generate.radial.text.horizontal(data, {
      radius: 100,
      x: 50,
      y: 50,
      textFont: QsEnumTextFont.COMIC_SANS_MS,
      textFontSize: 6,
      textFontStyle: QsEnumTextFontStyle.ITALIC,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textFill: 'black',
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
