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
      const data2: QsPlottedTextArgs[] = [
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
        textFont: QsEnumTextFont.HELVETICA,
        textFontSize: 30,
        textAnchor: QsEnumTextAnchor.MIDDLE,
        textAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        textFontWeight: QsEnumTextFontWeight.BOLD,
        textFill: 'darkgrey',
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
