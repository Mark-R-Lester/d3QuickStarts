import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasRadial,
  qsCreateCanvasRadial,
  QsRadial,
  QsRadialArcText,
  QsRadialTextData,
  QsRadialData,
  QsRadialArcTextFollow,
} from 'd3qs/d3QuickStart'
import { RadialArcTextChartProps } from '../../../common/chartProps'
import { EnumRadialTextOrientation } from '../../../common/enums'

export const RadialTextTransition: FunctionComponent<
  RadialArcTextChartProps
> = ({
  canvasConfig,
  config,
  data = [{ value: 25 }, { value: 10 }, { value: 15 }],
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element1, setElement1] = useState<
    QsRadialArcText | QsRadialArcTextFollow
  >()
  const [element2, setElement2] = useState<QsRadial>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)

      if (orientation === EnumRadialTextOrientation.FOLLOW)
        setElement1(canvas.generate.radialArc.text.follow(data, config))
      if (orientation === EnumRadialTextOrientation.SPOKE)
        setElement1(canvas.generate.radialArc.text.spoke(data, config))
      if (orientation === EnumRadialTextOrientation.HORIZONTAL)
        setElement1(canvas.generate.radialArc.text.horizontal(data, config))
      if (orientation === EnumRadialTextOrientation.ROTATED)
        setElement1(canvas.generate.radialArc.text.rotated(data, config))

      const radialArgs: QsRadialData[] = [
        { value: 0, fillColor: 'red' },
        { value: 0, fillColor: 'orange' },
        { value: 0, fillColor: 'green' },
      ]
      data.forEach((d, i) => {
        radialArgs[i].value = d.value
      })
      setElement2(canvas.generate.radialArc.radial(radialArgs))
    }
    createChart()
  }, [canvasConfig, config, data, orientation])

  useEffect(
    function transitionData() {
      const getVals = (): QsRadialTextData[] => {
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

      const radialArgs: QsRadialData[] = [
        { value: 0, fillColor: 'red' },
        { value: 0, fillColor: 'orange' },
        { value: 0, fillColor: 'green' },
      ]
      transitionData.forEach((d, i) => {
        radialArgs[i].value = d.value
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
