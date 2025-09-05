import { FunctionComponent, useEffect } from 'react'
import { QsCanvasRadial, qsCreateCanvasRadial } from 'd3qs/d3QuickStart'
import { RadialAxisChartProps } from '../../../common/chartProps'

export const RadialAxisChart: FunctionComponent<RadialAxisChartProps> = ({
  canvasConfig,
  config = {},
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.radialCentroid.spokes({
        numberOfSpokes: 6,
        defaultInnerRadius: 10,
        defaultOuterRadius: 105,
      })
      canvas.generate.radialCentroid.axis(config)

      canvas.generate.radialCentroid.area({
        highValues: [50, 75, 100, 125, 150, 230],
      })
      canvas.generate.radialCentroid.line({
        values: [50, 75, 100, 125, 150, 230],
        fillColor: 'blues',
      })
      canvas.generate.radialCentroid.points(
        [
          { value: 50 },
          { value: 75 },
          { value: 100 },
          { value: 125 },
          { value: 150 },
          { value: 230 },
        ],
        { defaultRadius: 2 }
      )
      canvas.generate.radialCentroid.text([
        { value: 50 },
        { value: 75 },
        { value: 100 },
        { value: 125 },
        { value: 150 },
        { value: 230 },
      ])
    }
    createChart()
  }, [canvasConfig, config])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
