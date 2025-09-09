import { select, Selection } from 'd3'
import { generateClassName } from '../core/generateClassName'
import { CanvasConfig } from './types'

export interface LayerActions {
  sendToTop: () => void
  sendToBottom: () => void
  lift: () => void
  lower: () => void
  hide: () => void
  show: () => void
}

export interface LayerResult {
  layer: Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  layerActions: LayerActions
}

export interface Canvas {
  canvasSVG: Selection<SVGSVGElement, CanvasConfig, HTMLElement, any>
  addUnboundLayer: () => LayerResult
  addDataLayer: () => LayerResult
}

export const getCanvas = (config: CanvasConfig): Canvas => {
  const { className: classCanvasSVG, dotClassName: dotClassCanvasSVG } =
    generateClassName('canvasSVG')
  const { className: classCanvasRect, dotClassName: dotClassCanvasRect } =
    generateClassName('canvasRect')

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

  const layers = new Map<
    string,
    Selection<SVGGElement, CanvasConfig, HTMLElement, any>
  >()
  let layerCounter = 0

  const generateUniqueLayerId = (prefix: string): string => {
    return `${prefix}-${layerCounter++}`
  }

  const addUnboundLayer = (): LayerResult => {
    const layerId = generateUniqueLayerId('unboundLayer')
    const { className: classCanvasGroup, dotClassName: dotClassCanvasGroup } =
      generateClassName(`canvasGroup-${layerId}`)
    const config = canvasSVG.datum()

    const layer = canvasSVG
      .append('g')
      .attr('class', classCanvasGroup)
      .attr('id', layerId)
      .datum(config)
      .attr('transform', (d) => `translate(${d.marginLeft}, ${d.marginTop})`)
      .attr('width', (d) => d.displayAreaWidth)
      .attr('height', (d) => d.displayAreaHeight)

    layers.set(layerId, layer)

    return {
      layer,
      layerActions: {
        sendToTop: () => layer.raise(),
        sendToBottom: () => layer.lower(),
        lift: () => {
          const node = layer.node()
          if (node?.parentNode) {
            const siblings = Array.from(node.parentNode.children)
            const index = siblings.indexOf(node)
            if (index < siblings.length - 1)
              node.parentNode.insertBefore(
                node,
                siblings[index + 1].nextSibling
              )
          }
        },
        lower: () => {
          const node = layer.node()
          if (node?.parentNode) {
            const siblings = Array.from(node.parentNode.children)
            const index = siblings.indexOf(node)
            if (index > 0)
              node.parentNode.insertBefore(node, siblings[index - 1])
          }
        },
        hide: () => layer.style('visibility', 'hidden'),
        show: () => layer.style('visibility', 'visible'),
      },
    }
  }

  const addDataLayer = (): LayerResult => {
    const layerId = generateUniqueLayerId('dataLayer')
    const { className: classDataSVG, dotClassName: dotClassDataSVG } =
      generateClassName(`dataSVG-${layerId}`)
    const { className: classDataGroup, dotClassName: dotClassDataGroup } =
      generateClassName(`dataGroup-${layerId}`)
    const config = canvasSVG.datum()

    const dataSVG = canvasSVG
      .append('svg')
      .datum(config)
      .attr('class', classDataSVG)
      .attr('width', (d) => d.displayAreaWidth)
      .attr('height', (d) => d.displayAreaHeight)
      .attr('x', (d) => d.marginLeft)
      .attr('y', (d) => d.marginTop)

    const layer = dataSVG
      .append('g')
      .datum(config)
      .attr('class', classDataGroup)
      .attr('id', layerId)
      .attr('transform', 'translate(0, 0)')
      .attr('width', (d) => d.displayAreaWidth)
      .attr('height', (d) => d.displayAreaHeight)

    layers.set(layerId, layer)

    return {
      layer,
      layerActions: {
        sendToTop: () => dataSVG.raise(),
        sendToBottom: () => dataSVG.lower(),
        lift: () => {
          const node = layer.node()
          if (node?.parentNode) {
            const siblings = Array.from(node.parentNode.children)
            const index = siblings.indexOf(node)
            if (index < siblings.length - 1)
              node.parentNode.insertBefore(
                node,
                siblings[index + 1].nextSibling
              )
          }
        },
        lower: () => {
          const node = layer.node()
          if (node?.parentNode) {
            const siblings = Array.from(node.parentNode.children)
            const index = siblings.indexOf(node)
            if (index > 0)
              node.parentNode.insertBefore(node, siblings[index - 1])
          }
        },
        hide: () => layer.style('visibility', 'hidden'),
        show: () => layer.style('visibility', 'visible'),
      },
    }
  }

  return {
    canvasSVG,
    addUnboundLayer,
    addDataLayer,
  }
}
