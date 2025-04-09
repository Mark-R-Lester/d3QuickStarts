import { ScaleLinear, scaleLinear } from 'd3'
import { CanvasConfigStrict } from '../canvas/types'

export interface CanvasScales {
  genralPercentScale: ScaleLinear<number, number, never>

  xPercentScale: ScaleLinear<number, number, never>
  xPercentScaleInverted: ScaleLinear<number, number, never>

  yPercentScale: ScaleLinear<number, number, never>
  yPercentScaleInverted: ScaleLinear<number, number, never>

  xDataScale: ScaleLinear<number, number, never>
  xDataScalePlotted: ScaleLinear<number, number, never>
  xDataScaleInverted: ScaleLinear<number, number, never>

  yDataScale: ScaleLinear<number, number, never>
  yDataScalePlotted: ScaleLinear<number, number, never>
  yDataScaleInverted: ScaleLinear<number, number, never>
}

export const getScales = (config: CanvasConfigStrict): CanvasScales => {
  const {
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
  } = config
  return {
    genralPercentScale: scaleLinear()
      .domain([0, 100])
      .range([0, Math.min(displayAreaHeight, displayAreaWidth)]),

    xPercentScale: scaleLinear().domain([0, 100]).range([0, displayAreaWidth]),
    xPercentScaleInverted: scaleLinear()
      .domain([0, 100])
      .range([displayAreaWidth, 0]),

    yPercentScale: scaleLinear().domain([0, 100]).range([0, displayAreaHeight]),
    yPercentScaleInverted: scaleLinear()
      .domain([0, 100])
      .range([displayAreaHeight, 0]),

    xDataScale: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([0, displayAreaWidth]),
    xDataScalePlotted: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([0, Math.min(displayAreaHeight, displayAreaWidth)]),
    xDataScaleInverted: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([displayAreaWidth, 0]),

    yDataScale: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([displayAreaHeight, 0]),
    yDataScalePlotted: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([Math.min(displayAreaHeight, displayAreaWidth), 0]),
    yDataScaleInverted: scaleLinear()
      .domain([lowestViewableValue, highestViewableValue])
      .range([0, displayAreaHeight]),
  }
}
