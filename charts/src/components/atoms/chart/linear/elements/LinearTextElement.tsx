import { FunctionComponent, useEffect } from 'react'
import {
  Canvas,
  createCanvas,
  linearTextGenerator,
  TextArgs,
} from 'd3qs/d3QuickStart'
import { chartProps } from '../../../../common/types/chartProps'

export const LinearTextElement: FunctionComponent<chartProps> = ({
  targetId,
}) => {
  const createChart = () => {
    var data1: TextArgs[] = [
      { x: 0, y: 0, text: 'Some Text' },
      { x: 50, y: 50, text: 'Some Text' },
      { x: 100, y: 100, text: 'Some Text' },
    ]

    const canvas: Canvas = createCanvas(targetId, {
      width: 600,
      min: 0,
      max: 250,
    })

    linearTextGenerator.text(canvas, data1, { color: 'black' })
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
