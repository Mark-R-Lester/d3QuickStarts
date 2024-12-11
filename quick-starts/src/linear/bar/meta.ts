import { QsCanvas } from '../../canvas/canvas'
import { range } from 'd3'
import { scaleLinear, scaleBand, ScaleOrdinal, scaleOrdinal } from 'd3-scale'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import { BarData, DrawArgs, Meta, QsBarConfigStrict } from './types'
import { Orientation } from '../../core/enums'

export const getMeta = (
  canvas: QsCanvas,
  args: DrawArgs,
  config: QsBarConfigStrict
): Meta[] => {
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaWidth,
    displayAreaHeight,
  } = canvas.config
  const { padding, colorDomain, colorRange } = config
  const { data, orientation } = args
  const isVertical = orientation === Orientation.VERTICAL

  const meta: Meta[] = []

  const colors: ScaleOrdinal<string, unknown, never> = scaleOrdinal()
    .domain(toStrings(colorDomain))
    .range(colorRange)

  const bandStepScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
  const bandWidthScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, isVertical ? displayAreaHeight : displayAreaWidth])
    .padding(padding / 100)
  const heightScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, isVertical ? displayAreaWidth : displayAreaHeight])

  const barSpaceing = (d: number, i: number) => {
    const adjustmentToCorrectD3 =
      (bandStepScale.step() - bandWidthScale.bandwidth()) / 2
    //TODO requires error handling
    const bandStep = bandStepScale(i.toString())
    if (bandStep) return bandStep + adjustmentToCorrectD3
    return 0
  }

  const x = (d: number, i: number) => (isVertical ? 0 : barSpaceing(d, i))
  const y = (d: number, i: number) =>
    isVertical ? barSpaceing(d, i) : displayAreaHeight - heightScale(d)

  const height = (d: number) =>
    isVertical ? bandWidthScale.bandwidth() : heightScale(d)
  const width = (d: number) =>
    isVertical ? heightScale(d) : bandWidthScale.bandwidth()
  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  data.forEach((d, i) => {
    const barData: BarData = {
      x: x(d, i),
      y: y(d, i),
      height: height(d),
      width: width(d),
      color: getColor(i, colors),
    }
    meta.push({
      class: 'bar',
      id: `bar-${uuidv4()}`,
      barData,
    })
  })
  return meta
}
