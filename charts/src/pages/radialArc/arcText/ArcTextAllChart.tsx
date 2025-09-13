import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsArcTextData,
  QsArcTextConfig,
} from 'd3qs/d3QuickStart'
import { ChartPropsOthogonal } from '../../../common/chartProps'

export const ArcTextAllChart: FunctionComponent<ChartPropsOthogonal> = ({
  canvasConfig,
}) => {
  useEffect(() => {
    const createChart = () => {
      const data1: QsArcTextData[] = [
        { value: 1, text: 'following the arc' },
        { value: 1, text: 'following the arc' },
        { value: 1, text: 'following the arc' },
        { value: 1, text: 'following the arc' },
        { value: 1, text: 'following the arc' },
      ]
      const config1: QsArcTextConfig = {
        radius: 100,
      }

      const data2: QsArcTextData[] = [
        { value: 1, text: 'spokes' },
        { value: 1, text: 'spokes' },
        { value: 1, text: 'spokes' },
        { value: 1, text: 'spokes' },
        { value: 1, text: 'spokes' },
      ]
      const config2: QsArcTextConfig = {
        radius: 110,
      }

      const data3: QsArcTextData[] = [
        { value: 1, text: 'horizontal' },
        { value: 1, text: 'horizontal' },
        { value: 1, text: 'horizontal' },
        { value: 1, text: 'horizontal' },
        { value: 1, text: 'horizontal' },
      ]
      const config3: QsArcTextConfig = {
        radius: 60,
      }

      const data4: QsArcTextData[] = [
        { value: 1, text: 'rotated' },
        { value: 1, text: 'rotated' },
        { value: 1, text: 'rotated' },
        { value: 1, text: 'rotated' },
        { value: 1, text: 'rotated' },
      ]
      const config4: QsArcTextConfig = {
        radius: 90,
      }

      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      canvas.generate.arc.text.follow(data1, config1)
      canvas.generate.arc.text.spokes(data2, config2)
      canvas.generate.arc.text.horizontal(data3, config3)
      canvas.generate.arc.text.rotated(data4, config4)
    }
    createChart()
  }, [canvasConfig])

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
