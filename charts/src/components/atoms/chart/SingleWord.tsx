/* eslint-disable react-hooks/exhaustive-deps */
import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsEnumTextFont,
  QsEnumTextFontWeight,
  QsEnumAlignmentBaseline,
  QsEnumTextAnchor,
} from 'd3qs/d3QuickStart'
import { QsUnboundTextData } from 'd3qs/unbound/text/qsTypes'

export interface SingleWordProps {
  chartName: string
  text: string
}

export const SingleWord: FunctionComponent<SingleWordProps> = ({
  chartName,
  text,
}: SingleWordProps) => {
  const canvasConfig = {
    chartName,
    width: 130,
    marginLeft: 0,
    marginBottom: 0,
    lowestViewableValue: 0,
    highestViewableValue: 100,
  }
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      const data2: QsUnboundTextData[] = [
        {
          x: 50,
          y: 50,
          text,
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
}
