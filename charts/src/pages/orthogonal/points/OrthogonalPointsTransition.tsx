import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsPointData,
  QsPoints,
} from 'd3qs/d3QuickStart'
import { PointChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const OrthogonalPointsTransition: FunctionComponent<PointChartProps> = ({
  canvasConfig,
  data,
  config,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsPoints>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasConfig)
      let newElement: QsPoints
      if (orientation === EnumOrientation.VERTICAL) {
        newElement = canvas.generate.orthogonal.vertical.points(data, config)
      } else {
        newElement = canvas.generate.orthogonal.horizontal.points(data, config)
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
