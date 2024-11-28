import { Canvas } from '../canvas/canvas'
import { scaleLinear, CurveFactory, curveLinear, areaRadial } from 'd3'
import { v4 as uuidv4 } from 'uuid'

export interface RadialAreaConfig {
  [key: string]: CurveFactory | number | undefined
  curve?: CurveFactory
  x?: number
  y?: number
}

export interface RadialAreaArgs {
  [key: string]: number[] | undefined
  dataOuter: number[]
  dataInner?: number[]
}

interface RadialAreaConfigStrict {
  [key: string]: CurveFactory | number | undefined
  curve: CurveFactory
  x: number
  y: number
}

interface DrawArgs {
  dataOuter: number[]
  dataInner?: number[]
  minimised: boolean
}

interface RadialAreaData {
  angle: number
  inner: number
  outer: number
}

interface Meta {
  class: string
  id: string
  areaDataMin: RadialAreaData[]
  areaData: RadialAreaData[]
}

const updateConfig = (
  customConfig?: RadialAreaConfig
): RadialAreaConfigStrict => {
  const defaults: RadialAreaConfigStrict = {
    curve: curveLinear,
    x: 50,
    y: 50,
  }

  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const area = (
  canvas: Canvas,
  data: RadialAreaArgs,
  customConfig?: RadialAreaConfig
) => {
  const config: RadialAreaConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    dataOuter: data.dataOuter,
    dataInner: data.dataInner,
    minimised: false,
  }
  return draw(canvas, args, config)
}

const areaMinimised = (
  canvas: Canvas,
  data: RadialAreaArgs,
  customConfig?: RadialAreaConfig
) => {
  const config: RadialAreaConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    dataOuter: data.dataOuter,
    dataInner: data.dataInner,
    minimised: true,
  }
  return draw(canvas, args, config)
}

export const radialAreaGenerator = {
  area,
  areaMinimised,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfigStrict
) => {
  const { dataOuter, dataInner, minimised } = args
  const { x, y, curve } = config
  const { min, max, displayAreaHeight, displayAreaWidth } = canvas.config
  let meta: Meta
  const angleScale = scaleLinear()
    .domain([0, dataOuter.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([min, max])
    .range([0, displayAreaHeight / 2])
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const dataOuterCopy: number[] = dataOuter.slice()
  dataOuterCopy.push(dataOuter[0])
  let dataInnerCopy: number[]
  if (dataInner) {
    dataInnerCopy = dataInner.slice()
    dataInnerCopy.push(dataInner[0])
  }

  meta = {
    class: 'radialArea',
    id: `radialArea${uuidv4()}`,
    areaDataMin: dataOuterCopy.map((d, i) => {
      return {
        angle: angleScale(i),
        outer: radialScale(min),
        inner: radialScale(min),
      }
    }),
    areaData: dataOuterCopy.map((d, i) => {
      return {
        angle: angleScale(i),
        outer: radialScale(d),
        inner: radialScale(dataInnerCopy ? dataInnerCopy[i] : min),
      }
    }),
  }

  const radialArea = areaRadial<RadialAreaData>()
    .angle((d) => d.angle)
    .outerRadius((d) => d.outer)
    .innerRadius((d) => d.inner)
    .curve(curve)

  const group = canvas.displayGroup.append('g')
  group
    .append('path')
    .attr('class', meta.class)
    .attr('id', meta.id)
    .attr('d', radialArea(minimised ? meta.areaDataMin : meta.areaData))
    .attr('fill', 'red')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
  return {
    area: group.selectAll('path'),
    group,
    meta,
    maximise: () => {
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialArea(meta.areaData))
    },
    minimise: () => {
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialArea(meta.areaDataMin))
    },
  }
}
