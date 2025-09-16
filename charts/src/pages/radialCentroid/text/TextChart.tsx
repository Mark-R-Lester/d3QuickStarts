import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsEnumCurve,
} from 'd3qs/d3QuickStart'
import { CentroidTextChartProps } from '../../../common/chartProps'

export const RadialTextChart: FunctionComponent<CentroidTextChartProps> = ({
  canvasConfig,
  config = {},
  data = [
    { value: 7 },
    { value: 3 },
    { value: 9 },
    { value: 2 },
    { value: 6 },
    { value: 8 },
    { value: 1 },
    { value: 4 },
    { value: 10 },
    { value: 5 },
    { value: 3 },
    { value: 7 },
    { value: 2 },
    { value: 9 },
  ],
}) => {
  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
      canvas.generate.centroid.text(data, config)

      if (Object.entries(config).length === 0) {
        canvas.generate.centroid.area(
          {
            highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
          },
          {
            defaultFillOpacity: 0.2,
            curve: QsEnumCurve.NATURAL,
          }
        )
      }

      if (Object.entries(config).length > 0) {
        canvas.generate.centroid.area(
          {
            highValues: [7, 3, 9, 2, 6, 8, 1, 4, 10, 5, 3, 7, 2, 9],
          },
          {
            defaultFillOpacity: 0.2,
            defaultStrokeColor: 'green',
            defaultStrokeWidth: 0.2,
            curve: QsEnumCurve.NATURAL,
          }
        )
        canvas.generate.centroid.spokes({
          numberOfSpokes: 14,
          defaultInnerRadius: 5,
          defaultOuterRadius: 102,
          defaultStrokeOpacity: 0.3,
        })
        canvas.generate.centroid.axis({
          numberOfTicks: 3,
          defaultStrokeOpacity: 0.3,
          defaultAxisAngle: 15,
          showText: false,
        })
      }

      canvas.generate.centroid.text(data, config)
    }
    createChart()
  }, [canvasConfig, config, data])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
