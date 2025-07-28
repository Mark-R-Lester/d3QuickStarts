/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, memo, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'
import { QsUnboundTextData } from 'd3qs/unbound/text/qsTypes'

export const ConfigAndData: FunctionComponent = memo(() => {
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
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)

      const data1: QsUnboundTextData[] = [
        {
          x: 50,
          y: 51.5,
          text: `&`,
        },
      ]
      canvas.generate.unbound.text(data1, {
        defaultTextFont: QsEnumTextFont.HELVETICA,
        defaultTextFontSize: 20,
        defaultTextAnchor: QsEnumTextAnchor.MIDDLE,
        defaultTextAlignmentBaseline: QsEnumAlignmentBaseline.CENTRAL,
        defaultTextFontWeight: QsEnumTextFontWeight.BOLD,
        defaultTextFill: 'darkgrey',
        defaultTextAngle: 0,
      })

      const data2: QsUnboundTextData[] = [
        {
          x: 50,
          y: 74,
          text: `Data`,
        },
        {
          x: 50,
          y: 32.5,
          text: `Config`,
        },
      ]
      canvas.generate.unbound.text(data2, {
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
})
