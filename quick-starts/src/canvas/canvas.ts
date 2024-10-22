import { BaseType, Selection, select } from 'd3-selection'

export interface CanvasConfig {
  [key: string]: string | number | undefined
  width?: number
  height?: number
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  marginBottom?: number
  max?: number
  min?: number
  borderColour?: string
}

export interface CanvasConfigStrict {
  [key: string]: string | number | undefined
  width: number
  height: number
  marginRight: number
  marginLeft: number
  marginTop: number
  marginBottom: number
  max: number
  min: number
  borderColour: string
  displayAreaHeight: number
  displayAreaWidth: number
}

export interface Canvas {
  displayGroup: Selection<SVGGElement, unknown, HTMLElement, any>
  config: CanvasConfigStrict
}

function draw(chartName: string, config: CanvasConfigStrict): Canvas {
  const scaleValues = (config: CanvasConfigStrict): void => {
    config.height = (config.width * config.height) / 100
    config.marginRight = (config.width * config.marginRight) / 100
    config.marginLeft = (config.width * config.marginLeft) / 100
    config.marginTop = (config.height * config.marginTop) / 100
    config.marginBottom = (config.height * config.marginBottom) / 100
    config.displayAreaHeight =
      config.height - (config.marginBottom + config.marginTop)
    config.displayAreaWidth =
      config.width - (config.marginLeft + config.marginRight)
  }
  scaleValues(config)

  const createSVG = (chartName: string) => {
    const svg = select(chartName).append('svg')
    svg.attr('width', config?.width).attr('height', config.height)
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', config.width)
      .attr('height', config.height)
      .style('stroke', config.borderColour)
      .style('fill', 'none')
      .style('stroke-width', '2')
    return svg
  }

  const createDisplayGroup = (
    svg: Selection<SVGSVGElement, unknown, HTMLElement, any>
  ) => {
    const displayGroup = svg.append('g')
    displayGroup
      .attr('class', 'displayGroup')
      .attr('border-color', 'red')
      .attr(
        'transform',
        'translate(' + config.marginLeft + ',' + config.marginTop + ')'
      )
      .attr('width', config.width - (config.marginLeft + config.marginRight))
      .attr('height', config.height - (config.marginTop + config.marginBottom))
    return displayGroup
  }

  const displayGroup = createDisplayGroup(createSVG(chartName))
  return { displayGroup, config }
}

export function createCanvas(
  chartName: string,
  newConfig?: CanvasConfig
): Canvas | undefined {
  const config: CanvasConfigStrict = {
    width: 500,
    height: 70,
    marginRight: 7,
    marginLeft: 7,
    marginTop: 15,
    marginBottom: 15,
    max: 0,
    min: 0,
    borderColour: 'lightgray',
    displayAreaHeight: 0,
    displayAreaWidth: 0,
  }
  if (newConfig) {
    Object.keys(newConfig).forEach((key) => (config[key] = newConfig[key]))
  }
  const children: Selection<BaseType, unknown, BaseType, unknown> = select(
    chartName
  )
    .selection()
    .selectChildren()
  if (children.size() === 0) {
    return draw(chartName, config)
  }

  console.log('Empty canvas')
  return undefined
}
