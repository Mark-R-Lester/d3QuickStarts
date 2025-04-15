/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedTextArgs,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'

export const ConfigAndData: FunctionComponent = () => {
  const canvasConfig = {
    chartName: 'configAndData',
    width: 130,
    marginLeft: 0,
    marginBottom: 0,
    lowestViewableValue: 0,
    highestViewableValue: 100,
  }
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasConfig)

      const data1: QsPlottedTextArgs[] = [
        {
          x: 50,
          y: 47.5,
          text: `and`,
        },
      ]
      canvas.generate.plotted.text(data1, {
        textFont: QsEnumTextFont.HELVETICA,
        textFontSize: 20,
        textAnchor: QsEnumTextAnchor.MIDDLE,
        textAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        textFontWeight: QsEnumTextFontWeight.BOLD,
        textFill: 'blue',
        textAngle: 0,
      })

      const data2: QsPlottedTextArgs[] = [
        {
          x: 50,
          y: 75,
          text: `Data`,
        },
        {
          x: 50,
          y: 20,
          text: `Config`,
        },
      ]
      canvas.generate.plotted.text(data2, {
        textFont: QsEnumTextFont.HELVETICA,
        textFontSize: 30,
        textAnchor: QsEnumTextAnchor.MIDDLE,
        textAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        textFontWeight: QsEnumTextFontWeight.BOLD,
        textFill: 'blue',
        textAngle: 0,
      })
    }
    createChart()
  }, [])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
