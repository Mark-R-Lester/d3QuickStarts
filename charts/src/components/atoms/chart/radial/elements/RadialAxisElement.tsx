import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialAxisElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: number[] = [5, 10, 15, 50]

      const canvas: QsCanvas = qsCreateCanvas({
        chartName,
        width: 600,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      })

      canvas.generate.radialCentroid.axis(data, {
        radius: 100,
        x: 50,
        y: 50,
        axisAngle: 45,
        gap: 40,
        color: 'black',
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
    createChart()
  }, [chartName])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
