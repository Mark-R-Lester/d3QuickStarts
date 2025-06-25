import { ScaleLinear, scaleLinear } from 'd3'
import { CanvasConfig } from './types'

export interface CanvasScales {
  xCanvasPercentScaleInverted: ScaleLinear<number, number, never>
  xCanvasPercentScale: ScaleLinear<number, number, never>
  yCanvasPercentScaleInverted: ScaleLinear<number, number, never>
  yCanvasPercentScale: ScaleLinear<number, number, never>

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

export const getScales = (config: CanvasConfig): CanvasScales => {
  const {
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    displayAreaWidth,
    displayAreaHeight,
    lowestViewableValue,
    highestViewableValue,
    height,
    width,
  } = config
  return {
    xCanvasPercentScaleInverted: scaleLinear()
      .domain([0, 100])
      .range([width - marginRight, 0 - marginLeft]),
    xCanvasPercentScale: scaleLinear()
      .domain([0, 100])
      .range([0 - marginLeft, width - marginRight]),

    yCanvasPercentScaleInverted: scaleLinear()
      .domain([0, 100])
      .range([height - marginBottom, 0 - marginTop]),
    yCanvasPercentScale: scaleLinear()
      .domain([0, 100])
      .range([0 - marginTop, height - marginBottom]),

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
