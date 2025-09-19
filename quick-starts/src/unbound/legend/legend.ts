import { getCalculatedData } from './calculatedData'
import { LegendConfig } from './types'
import {
  QsLegendData,
  QsLegendConfig,
  QsLegend,
  QsCalculatedDataUnboundLegend,
} from './qsTypes'
import { legendConfig } from '../../core/config/configDefaults'
import { addDefaultsToConfig } from '../../core/config/addDefaultsToConfig'
import { Canvas, CanvasConfig } from '../../canvas/types'
import { generateClassName } from '../../core/generateClassName'
import { select, Selection } from 'd3'
import { QsEnumShape } from '../../core/customShapes/qsEnums'
import {
  customRectangle,
  RectangleConfig,
} from '../../core/customShapes/rectangle/customRectangle'
import {
  customPolygon,
  PolygonConfig,
} from '../../core/customShapes/polygon/customPolygon'
import { customStar, StarConfig } from '../../core/customShapes/star/customStar'
import { Shape } from '../../core/customShapes/types'

export const legend = (
  canvas: Canvas,
  data: QsLegendData[],
  customConfig?: QsLegendConfig
): QsLegend => {
  const config: LegendConfig = addDefaultsToConfig<LegendConfig>(
    legendConfig,
    customConfig,
    canvas.configStore.unbound.legendConfig()
  )

  return draw(canvas, data, config)
}

const draw = (canvas: Canvas, data: QsLegendData[], config: LegendConfig) => {
  const calculatedData: QsCalculatedDataUnboundLegend[] = getCalculatedData(
    canvas,
    data,
    config
  )

  const { className: classNameShape, dotClassName: dotClassNameShape } =
    generateClassName('unboundLegendShape')
  const { className: classNameText, dotClassName: dotClassNameText } =
    generateClassName('unboundLegendText')

  const drawShape = (shape: Shape): string => {
    if (shape.type === QsEnumShape.RECTANGLE)
      return customRectangle(shape.config as RectangleConfig)
    if (shape.type === QsEnumShape.POLYGON)
      return customPolygon(shape.config as PolygonConfig)
    if (shape.type === QsEnumShape.STAR)
      return customStar(shape.config as StarConfig)
    throw new Error('Angles must be positive and sum to 180 degrees')
  }

  const { layer, layerActions } = canvas.addUnboundLayer()
  const group: Selection<SVGGElement, CanvasConfig, HTMLElement, any> =
    layer.append('g')

  group
    .selectAll(dotClassNameShape)
    .data(calculatedData)
    .enter()
    .append('g')
    .attr('class', classNameShape)
    .each(function (d) {
      const g = select(this)
      if (d.shape.type === QsEnumShape.CIRCLE) {
        g.append('circle')
          .attr('cx', d.shape.config.x)
          .attr('cy', d.shape.config.y)
          .attr('r', d.shape.config.radius)
          .attr('fill', d.fillColor)
          .attr('fill-opacity', d.fillOpacity)
          .attr('stroke', d.strokeColor)
          .attr('stroke-opacity', d.strokeOpacity)
          .attr('stroke-width', d.strokeWidth)
      } else {
        g.append('path')
          .attr('d', drawShape(d.shape))
          .attr('fill', d.fillColor || 'none')
          .attr('fill-opacity', d.fillOpacity)
          .attr('stroke', d.strokeColor || 'none')
          .attr('stroke-opacity', d.strokeOpacity ?? 1)
          .attr('stroke-width', d.strokeWidth ?? 1)
      }
    })

  group
    .selectAll(dotClassNameText)
    .data(calculatedData)
    .enter()
    .append('text')
    .attr('class', classNameText)
    .attr('font-family', (d) => d.textFont)
    .attr('font-style', (d) => d.textFontStyle)
    .attr('font-weight', (d) => d.textFontWeight)
    .attr('font-size', (d) => `${d.textFontSize}px`)
    .attr('text-decoration', (d) => d.textDecorationLine)
    .attr('fill', (d) => d.textFill)
    .attr('stroke', (d) => d.textStroke)
    .style('text-anchor', (d) => d.textAnchor)
    .style('alignment-baseline', (d) => d.textAlignmentBaseline)
    .attr('transform', (d) => {
      return `translate(${d.textX}, ${d.textY})rotate(${d.textAngle})`
    })
    .text((d) => d.value)

  return {
    classNameShape,
    classNameText,
    layerActions,
    calculatedData,
  }
}
