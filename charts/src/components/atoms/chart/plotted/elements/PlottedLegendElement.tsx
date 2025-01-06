import { FunctionComponent, useEffect } from 'react'
import { QsCanvas, qsCreateCanvas, QsLegendData } from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'
import {
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
} from 'd3qs/core/qsEnums'

export const PlottedLegendElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: QsLegendData[] = [
      { value: 'Red', fillColor: 'red' },
      { value: 'Blue', fillColor: 'blue' },
      { value: 'Green', fillColor: 'green' },
      { value: 'Purple', fillColor: 'purple' },
    ]

    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    canvas.generate.plotted.legend(data, {
      x: 0,
      y: 0,
      height: 1,
      width: 7,
      space: 10,
      textFont: QsEnumTextFont.SERIF,
      textFontWeight: QsEnumTextFontWeight.NORMAL,
      textFontStyle: QsEnumTextFontStyle.ITALIC,
      textFontSize: 5,
      textDecorationLine: QsEnumTextDecorationLine.NORMAL,
      textAngle: 0,
      textAlignmentBaseline: QsEnumAlignmentBaseline.MIDDLE,
      textAnchor: QsEnumTextAnchor.START,
      textStroke: 'black',
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
