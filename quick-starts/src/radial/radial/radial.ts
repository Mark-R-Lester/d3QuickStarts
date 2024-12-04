import { Canvas } from '../../canvas/canvas'
import {
  scaleLinear,
  scaleOrdinal,
  range,
  schemePurples,
  ScaleOrdinal,
  ScaleLinear,
  Selection,
} from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { arc } from 'd3'
import { toStrings } from '../../core/conversion'
import { ColorName, DomainName } from '../../core/types'

export interface RadialConfig {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius?: number
  innerRadius?: number
  padAngle?: number
  cornerRadius?: number
  x?: number
  y?: number
  colorDomain?: string[] | number[]
  colorRange?: Iterable<unknown>
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: RadialArgs[]) => void
}

interface RadialConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  outerRadius: number
  innerRadius: number
  padAngle: number
  cornerRadius: number
  x: number
  y: number
  colorDomain: string[] | number[]
  colorRange: Iterable<unknown>
}

export interface RadialArgs {
  value: number
  color?: ColorName | DomainName
}

interface TweenedArcData {
  data: number
  cornerRadius: number
  outerRadius: number
  innerRadius: number
  startAngle: number
  endAngle: number
}

interface ArcData extends TweenedArcData {
  color: string
  index?: number
  value?: number
}

interface DrawArgs {
  data: RadialArgs[]
  pie: boolean
}

interface Meta {
  class: string
  id: string
  arcData: ArcData
}

const updateConfig = (customConfig?: RadialConfig): RadialConfigStrict => {
  const defaults: RadialConfigStrict = {
    outerRadius: 100,
    innerRadius: 50,
    padAngle: 0,
    cornerRadius: 0,
    x: 50,
    y: 50,
    colorDomain: range(4),
    colorRange: schemePurples[4],
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const pie = (
  canvas: Canvas,
  data: RadialArgs[],
  customConfig?: RadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: true }
  const config: RadialConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

const doughnut = (
  canvas: Canvas,
  data: RadialArgs[],
  customConfig?: RadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: false }
  const config: RadialConfigStrict = updateConfig(customConfig)
  return draw(canvas, args, config)
}

export const radialGenerator = {
  pie,
  doughnut,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialConfigStrict
): QsRadial => {
  const { data, pie } = args
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
  const meta: Meta[] = []
  const xAxis: ScaleLinear<number, number, never> = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaWidth])
  const yAxis: ScaleLinear<number, number, never> = scaleLinear()
    .domain([0, 100])
    .range([0, displayAreaHeight])
  const colors: ScaleOrdinal<string, unknown, never> = scaleOrdinal()
    .domain(toStrings(colorDomain))
    .range(colorRange)

  const getColor = (
    color: ColorName | DomainName | undefined,
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    if (color?.colorName) return color.colorName

    let c: string | unknown = color?.domainName
      ? colorScale(color.domainName)
      : colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  const getMeta = (data: RadialArgs[], padAngle: number) => {
    let shares = 0
    data.forEach((d) => {
      shares = shares + d.value
    })
    if (data.length < 2) {
      padAngle = 0
    }
    const angle = (Math.PI * 2) / shares
    let startAngle = 0
    data.forEach((d, i) => {
      const endAngle: number = startAngle + angle * d.value
      meta.push({
        class: `arc`,
        id: `arc${uuidv4()}`,
        arcData: {
          data: d.value,
          color: getColor(d.color, i, colors),
          index: i,
          value: d.value,
          cornerRadius: yAxis(cornerRadius / 2),
          outerRadius: yAxis(outerRadius / 2),
          innerRadius: yAxis(pie ? 0 : innerRadius / 2),
          startAngle: startAngle + padAngle / 2,
          endAngle: endAngle - padAngle / 2,
        },
      })
      startAngle = endAngle
    })
  }
  getMeta(data, padAngle)

  const path = arc<TweenedArcData>()
    .cornerRadius((d) => d.cornerRadius)
    .outerRadius((d) => d.outerRadius)
    .innerRadius((d) => d.innerRadius)
    .startAngle((d) => d.startAngle)
    .endAngle((d) => d.endAngle)
  const group = canvas.displayGroup.append('g')

  const interpolate = (d: TweenedArcData, t: number, minimise: boolean) => {
    t = minimise ? 1 - t : t
    const tweenedData: TweenedArcData = {
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
    .attr('stroke', 'none')
    .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
    .attr('d', (d) => path(d.arcData))
    .attr('fill', (d) => d.arcData.color)

  return {
    element: group.selectAll('.arc'),
    transition: (data: RadialArgs[]) => {
      getMeta(data, padAngle)
      group
        .selectAll(`.${meta[0].class}`)
        .data(meta)
        .transition()
        .duration(3000)
        .tween('d', (d) => (t) => interpolate(d.arcData, t, true))
    },
  }
}
