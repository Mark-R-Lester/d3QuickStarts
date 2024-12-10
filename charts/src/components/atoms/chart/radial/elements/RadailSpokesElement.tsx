import { FunctionComponent, useEffect } from 'react'
import {
  QsCanvas,
  createCanvas,
  radialSpokesGenerator,
} from 'd3qs/d3QuickStart'
import { ChartProps } from '../../../../../common/chartProps'

export const RadialSpokesElement: FunctionComponent<ChartProps> = ({
  chartName,
}) => {
  const createChart = () => {
    const canvas: QsCanvas = createCanvas({
      chartName,
      width: 600,
      lowestViewableValue: 0,
      highestViewableValue: 250,
    })

    const numberOfSpokes = 6
    radialSpokesGenerator.spokes(canvas, numberOfSpokes)
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
