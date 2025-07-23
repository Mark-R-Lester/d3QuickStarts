import { FunctionComponent, useEffect, useState } from 'react'
import {
  QsCanvasOrthogonal,
  qsCreateCanvasOrthogonal,
  QsBarData,
  QsBars,
} from 'd3qs/d3QuickStart'
import { OrienetedChartProps } from '../../../common/chartProps'
import { EnumOrientation } from '../../../common/enums'

export const OrthogonalBarsTransition: FunctionComponent<
  OrienetedChartProps
> = ({ canvasProps, orientation }) => {
  const [changed, setChanged] = useState<boolean>(false)
  const [bars, setBars] = useState<QsBars>()

  useEffect(() => {
    const createChart = () => {
      const data: QsBarData[] = [
        { upperBoundry: 25 },
        { upperBoundry: 10 },
        { upperBoundry: 35 },
        { upperBoundry: 25 },
        { upperBoundry: 35 },
        { upperBoundry: 5 },
        { upperBoundry: 25 },
        { upperBoundry: 25 },
      ]
      const canvas: QsCanvasOrthogonal = qsCreateCanvasOrthogonal(canvasProps)
      let newBars: QsBars
      if (orientation === EnumOrientation.VERTICAL) {
        newBars = canvas.generate.orthogonal.vertical.bars(data)
      } else {
        newBars = canvas.generate.orthogonal.horizontal.bars(data)
      }
      setBars(newBars)
    }
    createChart()
  }, [canvasProps, orientation])

  useEffect(
    function transitionData() {
      const getVals = (): QsBarData[] => {
        const vals = []
        for (let i = 0; i < 8; i++) {
          let num = (Math.random() * 100) / 2
          vals.push({
            upperBoundry: num,
            fillColor: num < 25 ? 'green' : 'red',
          })
        }
        return vals
      }

      const transitionData = getVals()
      if (orientation === EnumOrientation.VERTICAL) {
        if (bars) bars.transition({ data: transitionData })
      } else {
        if (bars) bars.transition({ data: transitionData })
      }

      setTimeout(() => setChanged(!changed), 3000)
    },
    [bars, changed, orientation]
  )

  return (
    <>
      <div id={canvasProps.chartName}></div>
    </>
  )
}
