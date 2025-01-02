import { ScaleLinear, scaleLinear } from 'd3'
import { CanvasConfigStrict } from '../canvas/types'

export interface CanvasScales {
  genralPercentScale: ScaleLinear<number, number, never>
  xPercentScale: ScaleLinear<number, number, never>
  yPercentScale: ScaleLinear<number, number, never>
  xPercentScaleInverted: ScaleLinear<number, number, never>
  yPercentScaleInverted: ScaleLinear<number, number, never>
  yDataScale: ScaleLinear<number, number, never>
  xDataScale: ScaleLinear<number, number, never>
  xDataScaleInverted: ScaleLinear<number, number, never>
  yDataScaleInverted: ScaleLinear<number, number, never>
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
    .range([0, displayAreaHeight])
  const xPercentScaleInverted = scaleLinear()
    .domain([0, 100])
    .range([displayAreaWidth, 0])
  const yPercentScaleInverted = scaleLinear()
    .domain([0, 100])
    .range([displayAreaHeight, 0])
  const yDataScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaHeight, 0])
  const yDataScaleInverted = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight])
  const xDataScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaWidth])
  const xDataScaleInverted = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([displayAreaWidth, 0])

  const scales: CanvasScales = {
    genralPercentScale,
    xPercentScale,
    yPercentScale,
    xPercentScaleInverted,
    yPercentScaleInverted,
    yDataScale,
    xDataScale,
    xDataScaleInverted,
    yDataScaleInverted,
  }

  return scales
}
