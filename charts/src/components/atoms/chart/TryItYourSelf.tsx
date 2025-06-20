/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPlottedTextData,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'

export const TryItYourSelf: FunctionComponent = () => {
  const canvasConfig = {
    chartName: 'tryItYourSelf',
    width: 130,
    marginLeft: 0,
    marginBottom: 0,
    lowestViewableValue: 0,
    highestViewableValue: 100,
  }
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasConfig)
      const data2: QsPlottedTextData[] = [
        {
          x: 50,
          y: 30,
          text: `Try it`,
        },
        {
          x: 50,
          y: 66,
          text: `yourself`,
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
