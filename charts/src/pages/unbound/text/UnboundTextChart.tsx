import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsUnboundTextData,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const UnboundTextChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      const data: QsUnboundTextData[] = [
        { x: 0, y: 5, text: 'Text with no config uses defaults' },
      ]
      canvas.generate.unbound.text(data)

      const data1: QsUnboundTextData[] = [
        { x: 0, y: 90, text: 'Three pieces of' },
        { x: 15, y: 80, text: 'text in one call' },
        { x: 30, y: 70, text: 'utilise on the same config' },
      ]

      canvas.generate.unbound.text(data1, {
        defaultTextFont: QsEnumTextFont.FANTASY,
        defaultTextFontSize: 10,
        defaultTextFontStyle: QsEnumTextFontStyle.ITALIC,
        defaultTextStroke: 'red',
      })

      const data2: QsUnboundTextData[] = [
        { x: 10, y: 50, text: 'Text in separate call uses separate config' },
      ]
      canvas.generate.unbound.text(data2, {
        defaultTextFont: QsEnumTextFont.HELVETICA,
        defaultTextFontSize: 7,
        defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
        defaultTextFill: 'blue',
        defaultTextAngle: 10,
      })
      canvas.generate.orthogonal.vertical.axis.left([])
      canvas.generate.orthogonal.horizontal.axis.bottom([])
    }
    createChart()
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
