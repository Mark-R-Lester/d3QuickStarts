import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsTextArgs } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/core/qsEnums'

export const PlottedTextElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    const data: QsTextArgs[] = [
      { x: 0, y: 0, text: 'Text with no config uses defaults' },
    ]
    canvas.generate.plotted.text(data)

    const data1: QsTextArgs[] = [
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

    const data2: QsTextArgs[] = [
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

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
