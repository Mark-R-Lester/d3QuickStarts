import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsLegendData,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const UnboundLegendChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: QsLegendData[] = [
        { value: 'Red', fillColor: 'red' },
        { value: 'Blue', fillColor: 'blue' },
        { value: 'Green', fillColor: 'green' },
        { value: 'Purple', fillColor: 'purple' },
      ]

      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)

      canvas.generate.unbound.legend(data, {
        x: 10,
        y: 50,
        height: 2,
        width: 10,
        verticalSpacing: 10,
        relativeTextX: 0,
        relativeTextY: 5,
        textFont: QsEnumTextFont.SERIF,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textFontSize: 5,
        textDecorationLine: QsEnumTextDecorationLine.NORMAL,
        textAngle: 0,
        textAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        textAnchor: QsEnumTextAnchor.START,
        textStroke: 'black',
        textFill: 'black',
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
