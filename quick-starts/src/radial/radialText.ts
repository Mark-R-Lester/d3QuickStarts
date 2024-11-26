import { Canvas } from '../canvas/canvas'
import { scaleLinear, arc as d3arc } from 'd3'
import { v4 as uuidv4 } from 'uuid'

export interface RadialTextConfig {
  [key: string]: number | undefined
  radius?: number
  fontSize?: number
  x?: number
  y?: number
}

export interface RadialTextConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  fontSize: number
  x: number
  y: number
}

export interface ValuedText {
  value: number
  text?: string
}

interface RadialTextArgs {
  data: ValuedText[]
  banded: boolean
  type: string
  minimised: boolean
}

interface BandData {
  textId: string
  textClass: string
  arcId: string
  arcClass: string
  data: ValuedText
  index: number
  value: string | number
  startAngle: number
  endAngle: number
  outerRadius: number
  innerRadius: number
}

interface RadialTextMeta {
  arcClass: string
  textClass: string
  textArcData: BandData[]
  textArcDataMin: BandData[]
}

const configuration: RadialTextConfigStrict = {
  radius: 100,
  fontSize: 8,
  x: 50,
  y: 50,
}

const updateConfig = (customConfig?: RadialTextConfig) => {
  if (customConfig)
    Object.keys(customConfig).forEach(
      (key) => (configuration[key] = customConfig[key])
    )
}

const spokeMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'spoke',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const horizontalMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'horizontal',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const rotatedMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'rotated',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const followMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'follow',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const spokeBandedMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'spoke',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const horizontalBandedMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'horizontal',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const rotatedBandedMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'rotated',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const followBandedMinimised = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'follow',
    minimised: true,
  }
  return draw(canvas, args, configuration)
}

const spoke = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'spoke',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const horizontal = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'horizontal',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const rotated = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'rotated',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const follow = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: false,
    type: 'follow',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const spokeBanded = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'spoke',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const horizontalBanded = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'horizontal',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const rotatedBanded = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'rotated',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

const followBanded = (
  canvas: Canvas,
  data: ValuedText[],
  config?: RadialTextConfig
) => {
  updateConfig(config)
  const args: RadialTextArgs = {
    data,
    banded: true,
    type: 'follow',
    minimised: false,
  }
  return draw(canvas, args, configuration)
}

export const radialTextGenerator = {
  spokeMinimised,
  horizontalMinimised,
  rotatedMinimised,
  followMinimised,
  spokeBandedMinimised,
  horizontalBandedMinimised,
  rotatedBandedMinimised,
  followBandedMinimised,
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
  args: RadialTextArgs,
  config: RadialTextConfigStrict
) => {
  const { data, banded, type, minimised } = args
  const { radius, fontSize, x, y } = config
  const { displayAreaHeight, displayAreaWidth } = canvas.config
  let meta: RadialTextMeta
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

  const bandData = (data: ValuedText[], min?: boolean): BandData[] => {
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

  const pointData = (data: ValuedText[], min?: boolean): BandData[] =>
    bandData(data, min).map((d) => {
      const offSet = (d.endAngle - d.startAngle) / 2
      d.startAngle = d.startAngle - offSet
      d.endAngle = d.endAngle - offSet
      return d
    })

  meta = {
    arcClass: 'arc',
    textClass: 'text',
    textArcData: banded ? bandData(data) : pointData(data),
    textArcDataMin: banded
      ? bandData(data, minimised)
      : pointData(data, minimised),
  }
  const arc: any = d3arc()
  const group = canvas.displayGroup.append('g')
  const arcs = group.append('g')
  const text = group.append('g')

  if (type !== 'follow') {
    text
      .selectAll(`.${meta.textClass}`)
      .data(minimised ? meta.textArcDataMin : meta.textArcData)
      .enter()
      .append('g')
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`)
      .append('text')
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .attr('font-size', minimised ? 0 + 'px' : yAxis(fontSize) + 'px')
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
      .data(minimised ? meta.textArcDataMin : meta.textArcData)
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
      .data(minimised ? meta.textArcDataMin : meta.textArcData)
      .enter()
      .append('text')
      .attr('font-size', minimised ? `${0}px` : `${yAxis(fontSize)}px`)
      .attr('class', (d) => d.textClass)
      .attr('id', (d) => d.textId)
      .append('textPath')
      .attr('startOffset', '25%')
      .style('text-anchor', 'middle')
      .attr('xlink:href', (d) => `#${d.arcId}`)
      .text((d) => (d.data.text ? d.data.text : d.data.value))
  }
  return {
    text: text.selectAll('.arcText'),
    textArcs: arcs.selectAll('.textArc'),
    group,
    meta,
    minimise: () => {
      if (type !== 'follow') {
        text
        text
          .selectAll('.text')
          .data(meta.textArcDataMin)
          .transition()
          .duration(3000)
          .attr('font-size', yAxis(fontSize) + 'px')
          .attr(
            'transform',
            (d) => `translate(${arc.centroid(d)}) rotate(${rotate(d)})`
          )
      } else {
        arcs
          .selectAll('.arc')
          .data(meta.textArcDataMin)
          .transition()
          .duration(3000)
          .attr('d', arc)
        text
          .selectAll('.text')
          .data(meta.textArcDataMin)
          .transition()
          .duration(3000)
          .attr('font-size', `${yAxis(fontSize)}px`)
      }
    },
    maximise: () => {
      if (type !== 'follow') {
        text
          .selectAll('.text')
          .data(meta.textArcData)
          .transition()
          .duration(3000)
          .attr('font-size', yAxis(fontSize) + 'px')
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
          .attr('font-size', yAxis(fontSize) + 'px')
      }
    },
  }
}
