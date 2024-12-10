import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  plottedTextGenerator,
  TextArgs,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const PlottedTextElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const data: TextArgs[] = [
      { x: 0, y: 0, text: 'Some Text' },
      { x: 50, y: 50, text: 'Some Text' },
      { x: 100, y: 100, text: 'Some Text' },
    ]

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    plottedTextGenerator.text(canvas, data, { color: 'black' })
  }

  useEffect(() => {
    createChart()
  }, [])

  return (
    <>
      <div id={chartName}></div>
    </>
  )
}
