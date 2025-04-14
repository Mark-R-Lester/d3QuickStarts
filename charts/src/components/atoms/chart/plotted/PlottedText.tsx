import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedTextArgs,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/chartProps'

export const PlottedTextElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      const data: QsPlottedTextArgs[] = [
        { x: 0, y: 0, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.plotted.text(data)

      const data1: QsPlottedTextArgs[] = [
        { x: 0, y: 10, text: 'Three pieces of' },
        { x: 15, y: 20, text: 'text in one call' },
        { x: 30, y: 30, text: 'utilise on the same config' },
      ]

      canvas.generate.plotted.text(data1, {
        textFont: QsEnumTextFont.FANTASY,
        textFontSize: 10,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textStroke: 'red',
      })

      const data2: QsPlottedTextArgs[] = [
        { x: 0, y: 50, text: 'Text in separate call uses separate config' },
      ]
      canvas.generate.plotted.text(data2, {
        textFont: QsEnumTextFont.HELVETICA,
        textFontSize: 7,
        textFontWeight: QsEnumTextFontWeight.BOLD,
        textFill: 'blue',
        textAngle: 10,
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
