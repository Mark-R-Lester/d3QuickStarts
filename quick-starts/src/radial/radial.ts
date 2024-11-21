import { Canvas } from '../canvas/canvas'
import { scaleLinear, scaleOrdinal, range, schemePurples } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { arc } from 'd3'
import { toStrings } from '../core/conversion'

export interface RadialConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius?: number
  innerRadius?: number
  padAngle?: number
  cornerRadius?: number
  x?: number
  y?: number
  colorDomain?: number[]
  colorRange?: Iterable<unknown>
}

interface RadialConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  colorDomain: number[]
  colorRange: Iterable<unknown>
}

interface RadialArgs {
  data: number[][]
  pie: boolean
  minimised: boolean
}

interface ArcData {
  data: number[]
  index?: number
  value?: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  startAngle: number
  endAngle: number
}

interface RadialMeta {
  class: string
  id: string
  arcData: ArcData
  arcDataMin: ArcData
}

const configuration: RadialConfigStrict = {
  outerRadius: 100,
  innerRadius: 50,
  padAngle: 0,
  cornerRadius: 0,
  x: 50,
  y: 50,
  colorDomain: range(4),
  colorRange: schemePurples[4],
}

const updateConfig = (customConfig?: RadialConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const pie = (canvas: Canvas, data: number[][], config?: RadialConfig) => {
  updateConfig(config)
  const args = { data, pie: true, minimised: false }
  return draw(canvas, args, configuration)
}

const doughnut = (canvas: Canvas, data: number[][], config?: RadialConfig) => {
  updateConfig(config)
  const args = { data, pie: false, minimised: false }
  return draw(canvas, args, configuration)
}

const pieMinimised = (
  canvas: Canvas,
  data: number[][],
  config?: RadialConfig
) => {
  updateConfig(config)
  const args = { data, pie: true, minimised: true }
  return draw(canvas, args, configuration)
}

const doughnutMinimised = (
  canvas: Canvas,
  data: number[][],
  config?: RadialConfig
) => {
  updateConfig(config)
  const args = { data, pie: false, minimised: true }
  return draw(canvas, args, configuration)
}

export const areaGenerator = {
  pie,
  doughnut,
  pieMinimised,
  doughnutMinimised,
}

const draw = (canvas: Canvas, args: RadialArgs, config: RadialConfigStrict) => {
  const { data, pie, minimised } = args
  const {
    outerRadius,
    innerRadius,
    padAngle,
    cornerRadius,
    x,
    y,
    colorDomain,
    colorRange,
  } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  const meta: RadialMeta[] = []
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])
  const colors = scaleOrdinal().domain(toStrings(colorDomain)).range(colorRange)

  const createMeta = (data: number[][], padAngle: number) => {
    let shares = 0
    data.forEach((d) => {
      shares = shares + d[0]
    })
    if (data.length < 2) {
      padAngle = 0
    }
    const angle = (Math.PI * 2) / shares
    let startAngle = 0
    data.forEach((d, i) => {
      const endAngle = startAngle + angle * d[0]
      meta.push({
        class: `arc`,
        id: `arc${uuidv4()}`,
        arcData: {
          data: d,
          index: i,
          value: d[1] ? d[1] : d[0],
          cornerRadius: yAxis(cornerRadius / 2),
          outerRadius: yAxis(outerRadius / 2),
          innerRadius: yAxis(pie ? 0 : innerRadius / 2),
          startAngle: startAngle + padAngle / 2,
          endAngle: endAngle - padAngle / 2,
        },
        arcDataMin: {
          data: d,
          index: i,
          value: d[1] ? d[1] : d[0],
          cornerRadius: yAxis(cornerRadius / 2),
          outerRadius: yAxis(outerRadius / 2),
          innerRadius: yAxis(pie ? 0 : innerRadius / 2),
          startAngle: startAngle + padAngle / 2,
          endAngle: startAngle + padAngle / 2 + 0.00001,
        },
      })
      startAngle = endAngle
    })
  }
  createMeta(data, padAngle)

  const path = arc<ArcData>()
    .cornerRadius((d) => d.cornerRadius)
    .outerRadius((d) => d.outerRadius)
    .innerRadius((d) => d.innerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
  const group = canvas.displayGroup.append('g')

  const interpolate = (d: ArcData, t: number, minimise: boolean) => {
    t = minimise ? 1 - t : t
    const tweenedData: ArcData = {
      data: d.data,
      cornerRadius: t * d.cornerRadius,
      outerRadius: t * d.outerRadius,
      innerRadius: t * d.innerRadius,
      startAngle: d.startAngle,
      endAngle: d.endAngle,
    }
    return path(tweenedData)
  }

  group
    .selectAll('.arc')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('stroke', 'black')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
    .attr('d', (d) => (minimised ? path(d.arcDataMin) : path(d.arcData)))
    .attr('fill', (d, i) => {
      const res = colors(
        (minimised
          ? d.arcDataMin.data[1]
            ? d.arcDataMin.data[1]
            : i
          : d.arcData.data[1]
            ? d.arcData.data[1]
            : i
        ).toString()
      )
      if (typeof res === 'number') return res
      else return i
    })

  return {
    slices: group.selectAll('.arc'),
    group,
    meta,
    minimise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .tween('d', (d) => (t) => interpolate(d.arcData, t, true))
    },
    maximise: () => {
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .tween('d', (d) => (t) => interpolate(d.arcData, t, false))
    },
  }
}
