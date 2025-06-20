import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedTextData,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const PlottedTextChart: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      const data: QsPlottedTextData[] = [
        { x: 10, y: 100, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.plotted.text(data)

      const data1: QsPlottedTextData[] = [
        { x: 0, y: 90, text: 'Three pieces of' },
        { x: 15, y: 80, text: 'text in one call' },
        { x: 30, y: 70, text: 'utilise on the same config' },
      ]

      canvas.generate.plotted.text(data1, {
        defaultTextFont: QsEnumTextFont.FANTASY,
        defaultTextFontSize: 10,
        defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
        defaultTextStroke: 'red',
      })

      const data2: QsPlottedTextData[] = [
        { x: 0, y: 50, text: 'Text in separate call uses separate config' },
      ]
      canvas.generate.plotted.text(data2, {
        defaultTextFont: QsEnumTextFont.HELVETICA,
        defaultTextFontSize: 7,
        defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
        defaultTextFill: 'blue',
        defaultTextAngle: 10,
      })
      canvas.generate.linear.vertical.axis.left([])
      canvas.generate.linear.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
