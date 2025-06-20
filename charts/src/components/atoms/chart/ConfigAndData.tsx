/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
  QsPlottedTextData,
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

      const data1: QsPlottedTextData[] = [
        {
          x: 50,
          y: 47.5,
          text: `and`,
        },
      ]
      canvas.generate.plotted.text(data1, {
        defaultTextFont: QsEnumTextFont.HELVETICA,
        defaultTextFontSize: 20,
        defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
        defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
        defaultTextFill: 'darkgrey',
        defaultTextAngle: 0,
      })

      const data2: QsPlottedTextData[] = [
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
        defaultTextFont: QsEnumTextFont.HELVETICA,
        defaultTextFontSize: 30,
        defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
        defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
        defaultTextFill: 'darkgrey',
        defaultTextAngle: 0,
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
