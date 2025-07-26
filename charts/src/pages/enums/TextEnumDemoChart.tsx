import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasPlotted,
  qsCreateCanvasPlotted,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsEnumTextDecorationLine,
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsPlottedLineData,
  QsPlottedTextData,
} from 'd3qs/d3QuickStart'

export interface TextEnumDemoChartProps {
  chartName: string
  text: string
  showLines?: boolean
  textAlignmentBaseline?: QsEnumAlignmentBaseline
  textDecorationLine?: QsEnumTextDecorationLine
  textAnchor?: QsEnumTextAnchor
  textFontWeight?: QsEnumTextFontWeight
  textFontStyle?: QsEnumTextFontStyle
  textFont?: QsEnumTextFont
  height?: number
  width?: number
}

export const TextEnumDemoChart: FunctionComponent<TextEnumDemoChartProps> = ({
  chartName,
  text,
  height = 70,
  width = 500,
  showLines = true,
  textAlignmentBaseline = QsEnumAlignmentBaseline.MIDDLE,
  textDecorationLine = QsEnumTextDecorationLine.NORMAL,
  textAnchor = QsEnumTextAnchor.MIDDLE,
  textFontWeight = QsEnumTextFontWeight.NORMAL,
  textFontStyle = QsEnumTextFontStyle.NORMAL,
  textFont = QsEnumTextFont.SERIF,
}: TextEnumDemoChartProps) => {
  useEffect(() => {
    const createChart = () => {
      const textData: QsPlottedTextData = {
        x: 50,
        y: 50,
        text,
        textAlignmentBaseline,
        textDecorationLine,
        textAnchor,
        textFontWeight,
        textFontStyle,
        textFont,
        textFontSize: 50,
      }
      const canvas: QsCanvasPlotted = qsCreateCanvasPlotted({
        chartName: `textEnumDemo${chartName}`,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        height,
        width,
        highestViewableValueX: 100,
        highestViewableValueY: 100,
      })

      if (showLines) {
        const horizontalLine: QsPlottedLineData = {
          coordinates: [
            { x: 0, y: 50 },
            { x: 100, y: 50 },
          ],
        }
        const verticalLine: QsPlottedLineData = {
          coordinates: [
            { x: 50, y: 0 },
            { x: 50, y: 100 },
          ],
        }
        canvas.generate.plotted.line(horizontalLine)
        canvas.generate.plotted.line(verticalLine)
      }

      canvas.generate.plotted.text([textData])
    }
    createChart()
  }, [
    chartName,
    height,
    showLines,
    textAnchor,
    textDecorationLine,
    textFont,
    textFontStyle,
    textFontWeight,
    textAlignmentBaseline,
    width,
    text,
  ])

  return (
    <>
      <div id={`textEnumDemo${chartName}`}></div>
    </>
  )
}
