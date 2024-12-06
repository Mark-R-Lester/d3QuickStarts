import { Canvas } from '../../canvas/canvas'
import { arc as d3arc, Selection } from 'd3'
import { QsValuedText } from './types'
import { Meta, getMeta, QsRadialTextTransitionArgs } from './getMeta'
import { ScaleType } from '../../core/enums'

export { QsValuedText } from './types'

export interface QsRadialTextConfig {
  [key: string]: number | undefined
  radius?: number
  fontSize?: number
  x?: number
  y?: number
}

export interface QsRadialText {
  elementText:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  elementArcs:
    | Selection<SVGGElement, unknown, HTMLElement, any>
    | Selection<SVGGElement, unknown, SVGGElement, unknown>
  transition: (data: QsValuedText[], args: QsRadialTextTransitionArgs) => void
}

interface RadialTextConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
}

interface DrawArgs {
  data: QsValuedText[]
  scaleType: ScaleType
  type: string
}

const updateConfig = (
  customConfig?: QsRadialTextConfig
): RadialTextConfigStrict => {
  const defaults: RadialTextConfigStrict = {
    radius: 100,
    fontSize: 8,
    x: 50,
    y: 50,
  }
  if (!customConfig) return defaults

  Object.keys(customConfig).forEach(
    (key) => (defaults[key] = customConfig[key])
  )
  return defaults
}

const spoke = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: 'spoke',
  }
  return draw(canvas, args, config)
}

const horizontal = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: 'horizontal',
  }
  return draw(canvas, args, config)
}

const rotated = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: 'rotated',
  }
  return draw(canvas, args, config)
}

const follow = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.LINEAR,
    type: 'follow',
  }
  return draw(canvas, args, config)
}

const spokeBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: 'spoke',
  }
  return draw(canvas, args, config)
}

const horizontalBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: 'horizontal',
  }
  return draw(canvas, args, config)
}

const rotatedBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: 'rotated',
  }
  return draw(canvas, args, config)
}

const followBanded = (
  canvas: Canvas,
  data: QsValuedText[],
  customConfig?: QsRadialTextConfig
): QsRadialText => {
  const config: RadialTextConfigStrict = updateConfig(customConfig)
  const args: DrawArgs = {
    data,
    scaleType: ScaleType.BANDED,
    type: 'follow',
  }
  return draw(canvas, args, config)
}

export const radialTextGenerator = {
  spoke,
  horizontal,
  rotated,
  follow,
  spokeBanded,
  horizontalBanded,
  rotatedBanded,
  followBanded,
}

const draw = (
  canvas: Canvas,
  args: DrawArgs,
  config: RadialTextConfigStrict
): QsRadialText => {
  const { data, scaleType, type } = args
  const { radius, fontSize, x, y } = config

  let rotate: (angles: { startAngle: number; endAngle: number }) => number

  if (type === 'spoke') {
    rotate = (d) => {
      let angle: number = d.startAngle + (d.endAngle - d.startAngle) / 2
      angle = angle * (180 / Math.PI)
      return angle - 90
    }
  }

  if (type === 'horizontal') {
    rotate = (d) => {
      return 0
    }
  }

  if (type === 'rotated') {
    rotate = (d) => {
      let angle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (angle = angle * (180 / Math.PI))
    }
  }
  const transitionArgs: QsRadialTextTransitionArgs = { radius, scaleType }
  const meta: Meta = getMeta(canvas, data, transitionArgs)
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')
  const arcs = group.append('g')
  const text = group.append('g')

  if (type !== 'follow') {
    text
      .selectAll(`.${meta.textClass}`)
      .data(meta.textArcData)
      .enter()
      .append('g')
      .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
      .append('text')
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .attr('font-size', `${meta.yAxis(fontSize)}px`)
      .style('text-anchor', 'middle')
      .attr(
        'transform',
        (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
      )
      .attr('dy', '0.35em')
      .text((d) => (d.data.text ? d.data.text : d.data.value))
  } else {
    arcs
      .selectAll(`.${meta.arcClass}`)
      .data(meta.textArcData)
      .enter()
      .append('path')
      .attr('class', (d) => d.arcClass)
      .attr('id', (d) => d.arcId)
      .attr('d', arc)
      .attr('stroke-width', 0)
      .attr('fill', 'none')
      .attr('transform', `translate(${meta.xAxis(x)}, ${meta.yAxis(y)})`)
    text
      .selectAll(`.${meta.textClass}`)
      .data(meta.textArcData)
      .enter()
      .append('text')
      .attr('font-size', `${meta.yAxis(fontSize)}px`)
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .append('textPath')
      .attr('startOffset', '25%')
      .style('text-anchor', 'middle')
      .attr('xlink:href', (d) => `#${d.arcId}`)
      .text((d) => (d.data.text ? d.data.text : d.data.value))
  }
  return {
    elementText: text.selectAll('.arcText'),
    elementArcs: arcs.selectAll('.textArc'),
    transition: (data: QsValuedText[], args: QsRadialTextTransitionArgs) => {
      const meta: Meta = getMeta(canvas, data, args)
      if (type !== 'follow') {
        text
          .selectAll('.text')
          .data(meta.textArcData)
          .transition()
          .duration(3000)
          .attr('font-size', `${meta.yAxis(fontSize)}px`)
          .attr(
            'transform',
            (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
          )
      } else {
        arcs
          .selectAll('.arc')
          .data(meta.textArcData)
          .transition()
          .duration(3000)
          .attr('d', arc)
        text
          .selectAll('.text')
          .data(meta.textArcData)
          .transition()
          .duration(3000)
          .attr('font-size', `${meta.yAxis(fontSize)}px`)
      }
    },
  }
}
