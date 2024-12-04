import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  radialTextGenerator,
  QsValuedText,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const RadialTextElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    const data1: QsValuedText[] = [
      {
        value: 10,
        text: 'Ten',
      },
      {
        value: 20,
        text: 'Twenty',
      },
      {
        value: 30,
        text: 'Thirty',
      },
      {
        value: 40,
        text: 'Forty',
      },
      {
        value: 50,
        text: 'Fifty',
      },
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
    })

    radialTextGenerator.follow(canvas, data1)
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
