import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadial,
  QsRadialArcText,
  QsArcTextData,
  QsArcSliceData,
  QsArcTextFollow,
} from 'd3qs/d3QuickStart'
import { ArcTextChartProps } from '../../../common/chartProps'

export const RadialTextTransition: FunctionComponent<ArcTextChartProps> = ({
  canvasConfig,
  config,
  data = [{ value: 25 }, { value: 10 }, { value: 15 }],
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element1, setElement1] = useState<QsRadialArcText | QsArcTextFollow>()
  const [element2, setElement2] = useState<QsRadial>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      setElement1(canvas.generate.arc.text.follow(data, config))

      const radialArgs: QsArcSliceData[] = [
        { valueArc: 0, fillColor: 'red' },
        { valueArc: 0, fillColor: 'orange' },
        { valueArc: 0, fillColor: 'green' },
      ]
      data.forEach((d, i) => {
        radialArgs[i].valueArc = d.value
      })
      setElement2(canvas.generate.arc.slice(radialArgs))
    }
    createChart()
  }, [canvasConfig, config, data])

  useEffect(
    function transitionData() {
      const getVals = (): QsArcTextData[] => {
        const vals = []
        for (let i = 0; i < 3; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ value: num })
        }
        return vals
      }

      const transitionData = getVals()
      if (element1)
        element1.transition({
          data: transitionData,
        })

      const radialArgs: QsArcSliceData[] = [
        { valueArc: 0, fillColor: 'red' },
        { valueArc: 0, fillColor: 'orange' },
        { valueArc: 0, fillColor: 'green' },
      ]
      transitionData.forEach((d, i) => {
        radialArgs[i].valueArc = d.value
      })

      if (element2) element2.transition({ data: radialArgs })
      setTimeout(() => setChanged(!changed), 3000)
    },
    [element1, element2, changed]
  )

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
