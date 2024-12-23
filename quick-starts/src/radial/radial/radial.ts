import { QsCanvas } from '../../canvas/canvas'
import { interpolate, range, schemePurples, Selection, arc as d3arc } from 'd3'
import { QsRadialArgs, RadialConfigStrict, ArcData } from './types'
import { Meta, getMeta, updateMeta } from './meta'
import { QsTransitionArgs } from '../../core/types/qsTypes'
import { addTransitionDefaults } from '../../core/addTransitionDefaults'

export { QsRadialArgs } from './types'

export interface QsRadialConfig {
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

export interface QsRadialTransitionData {
  data: QsRadialArgs[]
  config?: QsRadialConfig
  transitionArgs?: QsTransitionArgs
}

export interface QsRadial {
  element:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsRadialTransitionData) => void
}

interface DrawArgs {
  data: QsRadialArgs[]
  pie: boolean
}

const updateCurrentConfig = (
  currentConfig: RadialConfigStrict,
  newConfig?: QsRadialConfig
): RadialConfigStrict => {
  if (!newConfig) return currentConfig

  Object.keys(newConfig).forEach((key) => (currentConfig[key] = newConfig[key]))
  return currentConfig
}

const addDefaultsToConfig = (
  customConfig?: QsRadialConfig
): RadialConfigStrict => {
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
  canvas: QsCanvas,
  data: QsRadialArgs[],
  customConfig?: QsRadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: true }
  const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

const doughnut = (
  canvas: QsCanvas,
  data: QsRadialArgs[],
  customConfig?: QsRadialConfig
): QsRadial => {
  const args: DrawArgs = { data, pie: false }
  const config: RadialConfigStrict = addDefaultsToConfig(customConfig)
  return draw(canvas, args, config)
}

export const qsRadialGenerator = {
  pie,
  doughnut,
}

const draw = (
  canvas: QsCanvas,
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

  const transitionArgs: RadialConfigStrict = {
    colorDomain,
    colorRange,
    outerRadius,
    innerRadius,
    cornerRadius,
    padAngle,
    x,
    y,
  }

  const meta: Meta[] = getMeta(canvas, data, transitionArgs)

  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')

  group
    .selectAll('.arc')
    .data(meta)
    .enter()
    .append('path')
    .attr('class', (d) => d.class)
    .attr('id', (d) => d.id)
    .attr('stroke', 'none')
    .attr('transform', (d) => `translate(${d.xAxis(x)}, ${d.yAxis(y)})`)
    .attr('d', (d) => arc(d.arcData))
    .attr('fill', (d) => d.arcData.color)

  return {
    element: group.selectAll('.arc'),
    transition: (data: QsRadialTransitionData) => {
      const updatedConfig = updateCurrentConfig(config, data.config)
      const args = addTransitionDefaults(data.transitionArgs)
      const updatedMeta: Meta[] = updateMeta(
        canvas,
        data.data,
        updatedConfig,
        meta
      )
      interface OldAndNew {
        old: ArcData
        new: ArcData
      }

      const createOldAndNew = (
        metaOld: Meta[],
        metaUpdated: Meta[]
      ): OldAndNew[] => {
        const arr: OldAndNew[] = []

        for (let i = 0; i < meta.length; i++) {
          arr.push({
            new: metaUpdated[i].arcData,
            old: metaOld[i].arcData,
          })
        }
        return arr
      }

      const oldAndNew: OldAndNew[] = createOldAndNew(meta, updatedMeta)
      const radialTween = (d: OldAndNew, arcGen: (arg0: ArcData) => any) => {
        const originalStartAngle = d.old.startAngle
        const originalEndAngle = d.old.endAngle
        const tweenStart = interpolate(originalStartAngle, d.new.startAngle)
        const tweenEnd = interpolate(originalEndAngle, d.new.endAngle)

        return function (t: number) {
          d.old.startAngle = tweenStart(t)
          d.old.endAngle = tweenEnd(t)

          return arcGen(d.old)
        }
      }

      group
        .selectAll(`.${meta[0].class}`)
        .data(oldAndNew)
        .attr('d', (d) => arc(d.new))
        .transition()
        .delay(args.delayInMiliSeconds)
        .duration(args.durationInMiliSeconds)
        .attrTween('d', (d) => radialTween(d, arc))
    },
  }
}
