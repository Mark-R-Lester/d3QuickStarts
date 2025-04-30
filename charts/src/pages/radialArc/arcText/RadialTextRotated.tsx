import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsValuedText,
  QsEnumTextAnchor,
  QsEnumTextFont,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const RadialTextRotatedElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
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

      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      canvas.generate.radialArc.text.rotated(data, {
        radius: 115,
        x: 50,
        y: 50,
        textFont: QsEnumTextFont.ARIAL,
        textFontSize: 10,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textAnchor: QsEnumTextAnchor.MIDDLE,
        textFill: 'orange',
        textStroke: 'blue',
      })
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
