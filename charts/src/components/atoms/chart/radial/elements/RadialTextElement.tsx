import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  qsRadialTextGenerator,
  QsValuedText,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialTextElement: FunctionComponent<ChartProps> = ({
  chartName,
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

    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    qsRadialTextGenerator.follow(canvas, data1)
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
