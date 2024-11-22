import { FunctionComponent, useEffect } from 'react'
import { Canvas, createCanvas, barGenerator } from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearBarsElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1 = [25, 10, 35, 25, 35, 5, 25, 25]
    const canvasV: Canvas = createCanvas(targetId, {
      width: 600,
    })
    barGenerator.vertical(canvasV, data1)

    // const canvasH: Canvas = createCanvas('horizontalBars', {
    //   width: 600,
    // })
    // barGenerator.horizontal(canvasH, data1)
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={targetId}></div>
    </>
  )
}
