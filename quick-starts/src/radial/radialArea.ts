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
}

interface RadialAreaData {
  angle: number
  inner: number
  outer: number
}

interface Meta {
  class: string
  id: string
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
  }
  return draw(canvas, args, config)
}

export const radialAreaGenerator = {
  area,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialAreaConfigStrict
) => {
  const { dataOuter, dataInner } = args
  const { x, y, curve } = config
  const {
    lowestViewableValue,
    highestViewableValue,
    displayAreaHeight,
    displayAreaWidth,
  } = canvas.config
  const angleScale = scaleLinear()
    .domain([0, dataOuter.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const dataOuterCopy: number[] = dataOuter.slice()
  dataOuterCopy.push(dataOuter[0])

  const getMeta = (dataInner?: number[]) => {
    let dataInnerCopy: number[]
    if (dataInner) {
      dataInnerCopy = dataInner.slice()
      dataInnerCopy.push(dataInner[0])
    }
    return {
      class: 'radialArea',
      id: `radialArea${uuidv4()}`,
      areaData: dataOuterCopy.map((d, i) => {
        return {
          angle: angleScale(i),
          outer: radialScale(d),
          inner: radialScale(
            dataInnerCopy ? dataInnerCopy[i] : lowestViewableValue
          ),
        }
      }),
    }
  }

  const meta: Meta = getMeta(dataInner)

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
    .attr('d', radialArea(meta.areaData))
    .attr('fill', 'red')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
  return {
    area: group.selectAll('path'),
    group,
    meta,
    transition: (args: RadialAreaArgs) => {
      const meta = getMeta(args.dataInner)
      group
        .selectAll(`.${meta.class}`)
        .transition()
        .duration(3000)
        .attr('d', radialArea(meta.areaData))
    },
  }
}
