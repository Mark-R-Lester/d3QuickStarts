import { select, Selection } from 'd3'
import { generateClassName } from '../core/generateClassName'
import { CanvasConfig } from './types'

export interface CanvasElements {
  canvasSVG: Selection<SVGSVGElement, CanvasConfig, HTMLElement, any>
  canvasGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  canvasDataGroup: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
}

export const createCanvasElements = (config: CanvasConfig): CanvasElements => {
  const { className: classCanvasSVG, dotClassName: dotClassCanvasSVG } =
    generateClassName('canvasSVG')
  const { className: classCanvasRect, dotClassName: dotClassCanvasRect } =
    generateClassName('canvasRect')
  const { className: classCanvasGroup, dotClassName: dotClassCanvasGroup } =
    generateClassName('canvasGroup')
  const { className: classDataSVG, dotClassName: dotClassDataSVG } =
    generateClassName('dataSVG')
  const { className: classDataGroup, dotClassName: dotClassDataGroup } =
    generateClassName('dataGroup')

  const canvasSVG = select(`#${config.chartName}`)
    .append('svg')
    .datum(config)
    .attr('class', classCanvasSVG)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)

  const rect = canvasSVG
    .append('rect')
    .attr('class', classCanvasRect)
    .datum(config)
    .attr('x', 0)
    .attr('y', 0)
    .attr('rx', (d) => d.rx)
    .attr('ry', (d) => d.ry)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .style('stroke', (d) => d.borderColor)
    .style('fill', (d) => d.fillColor)
    .style('stroke-width', (d) => d.borderWidth)

  const canvasGroup = canvasSVG
    .append('g')
    .attr('class', classCanvasGroup)
    .datum(config)
    .attr('transform', (d) => `translate(${d.marginLeft}, ${d.marginTop})`)
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)

  const dataSVG = canvasSVG
    .append('svg')
    .datum(config)
    .attr('class', classDataSVG)
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)
    .attr('x', (d) => d.marginLeft)
    .attr('y', (d) => d.marginTop)

  const canvasDataGroup = dataSVG
    .append('g')
    .datum(config)
    .attr('class', classDataGroup)
    .attr('id', 'canvasDataGroup')
    .attr('transform', 'translate(0, 0)')
    .attr('width', (d) => d.displayAreaWidth)
    .attr('height', (d) => d.displayAreaHeight)

  return {
    canvasSVG,
    canvasGroup,
    canvasDataGroup,
  }
}
