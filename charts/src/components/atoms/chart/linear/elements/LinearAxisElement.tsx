import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsLinearAxisGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/core/qsEnums'

export const LinearAxisElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data1 = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    const data2 = [0, 20, 20, 30, 20, 35, 0, 20, 15, 30, 10, 50]
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 200,
    })
    qsLinearAxisGenerator.xAxisBottomBanded(canvas, data1, {
      tickSize: 6,
      tickSizeInner: 6,
      tickSizeOuter: 0,
      tickPadding: 3,
      numberOfTicks: 2,
      hideAxisLine: false,
      percentageMovement: 0,
      textFont: QsEnumTextFont.SERIF,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textFontStyle: QsEnumTextFontStyle.NORMAL,
      textFontSize: 10,
      textDecorationLine: QsEnumTextDecorationLine.NORMAL,
      textAngle: 20,
      textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
      textAnchor: QsEnumTextAnchor.START,
      textStroke: 'blue',
      textFill: 'green',
      textX: 0,
      textY: 0,
    })
    qsLinearAxisGenerator.yAxisLeft(canvas, data2, {
      tickSize: 0,
      tickSizeInner: 6,
      tickSizeOuter: 6,
      tickPadding: 3,
      numberOfTicks: 5,
      hideAxisLine: false,
      percentageMovement: 0,
      textFont: QsEnumTextFont.SERIF,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textFontStyle: QsEnumTextFontStyle.ITALIC,
      textFontSize: 6,
      textDecorationLine: QsEnumTextDecorationLine.NORMAL,
      textAngle: 0,
      textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
      textAnchor: QsEnumTextAnchor.END,
      textStroke: 'blue',
      textFill: 'green',
      textX: 0,
      textY: 0,
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
