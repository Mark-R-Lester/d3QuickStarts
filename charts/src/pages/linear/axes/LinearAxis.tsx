import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsScaleType,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../common/chartProps'

export const LinearAxisElement: FunctionComponent<ChartProps> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
      const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)

      canvas.generate.linear.vertical.axis.left(data2, {
        tickSizeInner: -100,
        tickSizeOuter: 1,
        tickPadding: 2,
        tickColor: 'lightgrey',
        domainWidth: 3,
        numberOfTicks: 10,
        domainOpacity: 1,
        percentageMovement: 0,
        textFont: QsEnumTextFont.SERIF,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textFontStyle: QsEnumTextFontStyle.ITALIC,
        textFontSize: 3,
        textDecorationLine: QsEnumTextDecorationLine.NORMAL,
        textAngle: 0,
        textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
        textAnchor: QsEnumTextAnchor.END,
        textX: -20,
        textY: 0,
      })
      canvas.generate.linear.horizontal.axis.bottom(data1, {
        tickSizeInner: 2,
        tickSizeOuter: 0,
        tickPadding: 0,
        domainWidth: 3,
        domainOpacity: 1,
        domainScale: QsScaleType.BANDED,
        percentageMovement: 0,
        textFont: QsEnumTextFont.SERIF,
        textFontWeight: QsEnumTextFontWeight.NORMAL,
        textFontStyle: QsEnumTextFontStyle.NORMAL,
        textFontSize: 6,
        textDecorationLine: QsEnumTextDecorationLine.NORMAL,
        textAngle: 90,
        textAlignmentBaseline: QsEnumAlignmentBaseline.BASELINE,
        textAnchor: QsEnumTextAnchor.START,
        textStroke: 'blue',
        textFill: 'green',
        textX: 20,
        textY: 0,
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
