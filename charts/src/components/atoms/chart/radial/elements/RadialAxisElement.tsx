import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  qsRadialAxisGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/core/qsEnums'

export const RadialAxisElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: number[] = [5, 10, 15, 50]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 50,
    })

    qsRadialAxisGenerator.rings(canvas, data, {
      radius: 100,
      x: 50,
      y: 50,
      axisAngle: 45,
      gap: 40,
      color: 'black',
      strokeWidth: 1,
      textFont: QsEnumTextFont.VERDANA,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textFontStyle: QsEnumTextFontStyle.NORMAL,
      textFontSize: 8,
      textDecorationLine: QsEnumTextDecorationLine.NORMAL,
      textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
      textAnchor: QsEnumTextAnchor.MIDDLE,
      textStroke: 'red',
      textFill: 'black',
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
