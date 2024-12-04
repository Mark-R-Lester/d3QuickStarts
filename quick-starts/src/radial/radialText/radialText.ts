import { Canvas } from '../../canvas/canvas'
import { scaleLinear, arc as d3arc, Selection } from 'd3'
import { v4 as uuidv4 } from 'uuid'

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
  transition: (data: QsValuedText[]) => void
}

export interface QsValuedText {
  value: number
  text?: string
}

interface RadialTextConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
}

interface BandData {
  textId: string
  textClass: string
  arcId: string
  arcClass: string
  data: QsValuedText
  index: number
  value: string | number
  startAngle: number
  endAngle: number
  outerRadius: number
  innerRadius: number
}

interface Meta {
  arcClass: string
  textClass: string
  textArcData: BandData[]
}

interface DrawArgs {
  data: QsValuedText[]
  banded: boolean
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
    banded: false,
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
    banded: false,
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
    banded: false,
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
    banded: false,
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
    banded: true,
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
    banded: true,
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
    banded: true,
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
    banded: true,
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
  const { data, banded, type } = args
  const { radius, fontSize, x, y } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
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

  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

  const bandData = (data: QsValuedText[], min?: boolean): BandData[] => {
    let shares = 0
    data.forEach((d) => {
      shares = shares + d.value
    })
    const angle = (Math.PI * 2) / shares
    let startAngle = 0
    return data.map((d, i) => {
      const data = d
      const index = i
      const value = d.text ? d.text : d.value
      const endAngle = startAngle + angle * d.value
      const res = {
        textId: `text${uuidv4()}`,
        textClass: `text`,
        arcId: `arc${uuidv4()}`,
        arcClass: `arc`,
        data,
        index,
        value,
        startAngle,
        endAngle,
        outerRadius: min ? 0 : yAxis(radius / 2),
        innerRadius: min ? 0 : yAxis(radius / 2),
      }
      startAngle = endAngle
      return res
    })
  }

  const pointData = (data: QsValuedText[], min?: boolean): BandData[] =>
    bandData(data, min).map((d) => {
      const offSet = (d.endAngle - d.startAngle) / 2
      d.startAngle = d.startAngle - offSet
      d.endAngle = d.endAngle - offSet
      return d
    })

  const getMeta = (data: QsValuedText[]) => {
    return {
      arcClass: 'arc',
      textClass: 'text',
      textArcData: banded ? bandData(data) : pointData(data),
    }
  }
  const meta: Meta = getMeta(data)

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
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
      .append('text')
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .attr('font-size', `${yAxis(fontSize)}px`)
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
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
    text
      .selectAll(`.${meta.textClass}`)
      .data(meta.textArcData)
      .enter()
      .append('text')
      .attr('font-size', `${yAxis(fontSize)}px`)
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
    transition: (data: QsValuedText[]) => {
      const meta: Meta = getMeta(data)
      if (type !== 'follow') {
        text
          .selectAll('.text')
          .data(meta.textArcData)
          .transition()
          .duration(3000)
          .attr('font-size', `${yAxis(fontSize)}px`)
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
          .attr('font-size', `${yAxis(fontSize)}px`)
      }
    },
  }
}
