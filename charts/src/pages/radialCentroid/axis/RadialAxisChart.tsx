import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumTextFontStyle,
  QsEnumTextDecorationLine,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const RadialAxisChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasProps,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data: number[] = [5, 10, 15, 50]

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasProps)
      canvas.generate.radialCentroid.axis(data, {
        radius: 100,
        x: 50,
        y: 50,
        axisAngle: 45,
        gap: 20,
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
  }, [canvasProps])

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
