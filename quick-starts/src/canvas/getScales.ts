import { ScaleLinear, scaleLinear } from 'd3'
import { CanvasConfigStrict } from '../canvas/types'

export interface CanvasScales {
  genralPercentScale: ScaleLinear<number, number, never>
  xPercentScale: ScaleLinear<number, number, never>
  yPercentScale: ScaleLinear<number, number, never>
  yDataScale: ScaleLinear<number, number, never>
  xDataScale: ScaleLinear<number, number, never>
}

export const getScales = (config: CanvasConfigStrict) => {
  const {
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
  } = config
  const genralPercentScale = scaleLinear()
    .domain([0, 100])
    .range([0, Math.min(displayAreaHeight, displayAreaWidth)])
  const xPercentScale = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaWidth])
  const yPercentScale = scaleLinear()
    .domain([0, 100])
    .range([displayAreaHeight, 0])
  const yDataScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaHeight, 0])
  const xDataScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaWidth])

  const scales: CanvasScales = {
    genralPercentScale,
    xPercentScale,
    yPercentScale,
    yDataScale,
    xDataScale,
  }

  return scales
}
