import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { EnvelopeChartProps } from '../../../common/chartProps'

export const ArcEnvelopeChart: FunctionComponent<EnvelopeChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { valueArc: 20, valueRad: 45 },
    { valueArc: 60, valueRad: 20 },
    { valueArc: 20, valueRad: 40 },
    { valueArc: 15, valueRad: 30 },
    { valueArc: 10, valueRad: 20 },
    { valueArc: 20, valueRad: 45 },
    { valueArc: 15, valueRad: 30 },
    { valueArc: 10, valueRad: 45 },
    { valueArc: 15, valueRad: 30 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.arc.envelope(data, config)
      if (Object.values(config).length > 0) {
        canvas.generate.unbound.text([
          {
            x: 50,
            y: 95,
            textFontSize: 7,
            text: 'Passes made VS percent completed',
          },
        ])
        canvas.generate.centroid.axis({
          defaultAxisAngle: 90,
          defaultTextFontSize: 5,
          showCentralTick: false,
        })
        canvas.generate.arc.text.follow(
          [
            { value: 20, text: 'Jones: 20' },
            { value: 30, text: 'Smith: 30' },
            { value: 15, text: 'Obi: 15' },
          ],
          {
            scaleType: QsEnumScaleType.BANDED,
            radius: 105,
            textFontSize: 7,
          }
        )
      }
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
