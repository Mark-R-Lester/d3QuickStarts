import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsRadial,
  QsRadialText,
  QsValuedText,
  QsRadialData,
} from 'd3qs/d3QuickStart'
import { RadialTextChartProps } from '../../../../../common/chartProps'
import { EnumRadialTextOrientation } from '../../../../../common/enums'

export const RadialTextTransition: FunctionComponent<RadialTextChartProps> = ({
  chartName,
  config,
  data,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element1, setElement1] = useState<QsRadialText>()
  const [element2, setElement2] = useState<QsRadial>()

  const createChart = () => {
    const canvas: QsCanvas = qsCreateCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 40,
    })

    if (orientation === EnumRadialTextOrientation.FOLLOW)
      setElement1(canvas.generate.radial.text.followBanded(data, config))
    if (orientation === EnumRadialTextOrientation.SPOKE)
      setElement1(canvas.generate.radial.text.spokeBanded(data, config))
    if (orientation === EnumRadialTextOrientation.HORIZONTAL)
      setElement1(canvas.generate.radial.text.horizontalBanded(data, config))
    if (orientation === EnumRadialTextOrientation.ROTATED)
      setElement1(canvas.generate.radial.text.rotatedBanded(data, config))

    const radialArgs: QsRadialData[] = [
      { value: 0, color: 'red' },
      { value: 0, color: 'orange' },
      { value: 0, color: 'green' },
    ]
    data.forEach((d, i) => {
      radialArgs[i].value = d.value
    })
    setElement2(canvas.generate.radial.radial(radialArgs))
    // setElement2(qsRadialGenerator.radial(canvas, radialArgs))
  }

  useEffect(() => {
    createChart()
  }, [])

  useEffect(
    function transitionData() {
      const getVals = (): QsValuedText[] => {
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
        { value: 0, color: 'red' },
        { value: 0, color: 'orange' },
        { value: 0, color: 'green' },
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
      <div id={chartName}></div>
    </>
  )
}
