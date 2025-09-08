import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsPointData,
  QsText,
} from 'd3qs/d3QuickStart'
import { PointChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const OrthogonalTextTransition: FunctionComponent<PointChartProps> = ({
  canvasConfig,
  data = [
    { value: 25, fillColor: 'red' },
    { value: 10 },
    { value: 35 },
    { value: 25 },
    { value: 35 },
    { value: 5 },
    { value: 25 },
    { value: 25 },
  ],
  config,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsText>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      let newElement: QsText
      if (orientation === EnumOrientation.VERTICAL) {
        newElement = canvas.generate.orthogonal.vertical.text(data, config)
      } else {
        newElement = canvas.generate.orthogonal.horizontal.text(data, config)
      }
      setElement(newElement)
    }
    createChart()
  }, [canvasConfig, config, data, orientation])

  useEffect(
    function transitionData() {
      const getVals = (): QsPointData[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({ value: num })
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === EnumOrientation.VERTICAL) {
        if (element) element.transition({ data: transitionData })
      } else {
        if (element) element.transition({ data: transitionData })
      }

      setTimeout(() => setChanged(!changed), 3000)
    },
    [element, changed, orientation]
  )

  return (
    <>
      <div id={canvasConfig.chartName}></div>
    </>
  )
}
