import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumScaleType,
} from 'd3qs/d3QuickStart'
import { SegmentChartProps } from '../../../common/chartProps'

export const RadialConfigChart: FunctionComponent<SegmentChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { valueRad: 40 },
    { valueRad: 20 },
    { valueRad: 12 },
    { valueRad: 35 },
    { valueRad: 18 },
    { valueRad: 45 },
    { valueRad: 30 },
    { valueRad: 20 },
    { valueRad: 45 },
    { valueRad: 15 },
    { valueRad: 38 },
    { valueRad: 45 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialArc.segment(data, config)
      if (Object.entries(config).length > 0) {
        canvas.generate.centroid.axis({
          defaultAxisAngle: 15,
          showCentralTick: false,
        })
        canvas.generate.radialArc.text.follow(
          [
            { value: 1, text: 'Apple' },
            { value: 1, text: 'Pear' },
            { value: 1, text: 'Plum' },
            { value: 1, text: 'Kiwi' },
            { value: 1, text: 'Mango' },
            { value: 1, text: 'Lime' },
            { value: 1, text: 'Fig' },
            { value: 1, text: 'Grape' },
            { value: 1, text: 'Lemon' },
            { value: 1, text: 'Peach' },
            { value: 1, text: 'Cherry' },
            { value: 1, text: 'Apricot' },
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
