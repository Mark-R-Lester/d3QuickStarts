import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedTextArgs,
  QsEnumTextFont,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../common/chartProps'

export const PlottedTextElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

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
