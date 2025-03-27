import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvas,
  qsCreateCanvas,
  QsPointData,
  QsPoints,
} from 'd3qs/d3QuickStart'
import { EnumOrientation } from '../../../../../common/enums'
import { PointChartProps } from '../../../../../common/chartProps'

export const LinearPointsTransition: FunctionComponent<PointChartProps> = ({
  canvasProps,
  data,
  config,
  orientation,
}) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [element, setElement] = useState<QsPoints>()

  useEffect(() => {
    const createChart = () => {
      const canvas: QsCanvas = qsCreateCanvas(canvasProps)
      let newElement: QsPoints
      if (orientation === EnumOrientation.VERTICAL) {
        newElement = canvas.generate.linear.vertical.points(data, config)
      } else {
        newElement = canvas.generate.linear.horizontal.points(data, config)
      }
      setElement(newElement)
    }
    createChart()
  }, [canvasProps, config, data, orientation])

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
      <div id={canvasProps.chartName}></div>
    </>
  )
}
