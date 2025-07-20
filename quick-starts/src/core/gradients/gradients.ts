import { QsCanvas } from '../../canvas/qsTypes'
import { addColorsToGradient } from './addColorsToGradient'
import { createColorStops } from './createColorStops'

export interface QsColorStop {
  color: string
  offset: number
}

interface LinearGradient {
  canvas: QsCanvas
  gradientId: string
  x1?: string
  y1?: string
  x2?: string
  y2?: string
}

export interface QsLinearGradientColorStopData extends LinearGradient {
  colorStops: QsColorStop[]
}

export interface QsLinearGradientData extends LinearGradient {
  colors: string[]
}

interface RadialGradient {
  canvas: QsCanvas
  gradientId: string
  cx: string
  cy: string
  r: string
}

export interface QsRadialGradientColorStopData extends RadialGradient {
  colorStops: QsColorStop[]
}

export interface QsRadialGradientData extends RadialGradient {
  colors: string[]
}

export const qsCreateCustomStopLinearGradient = ({
  canvas,
  gradientId,
  colorStops,
  x1 = '0%',
  y1 = '0%',
  x2 = '0%',
  y2 = '100%',
}: QsLinearGradientColorStopData): string => {
  const defs: any = canvas.canvasSVG.append('defs')

  const gradient: d3.Selection<
    SVGLinearGradientElement,
    unknown,
    SVGGElement,
    unknown
  > = defs
    .append('linearGradient')
    .attr('id', gradientId)
    .attr('x1', x1)
    .attr('y1', y1)
    .attr('x2', x2)
    .attr('y2', y2)

  addColorsToGradient(colorStops, gradient)
  return `url(#${gradientId})`
}

export const qsCreateLinearGradient = ({
  canvas,
  gradientId,
  colors,
  x1 = '0%',
  y1 = '0%',
  x2 = '0%',
  y2 = '100%',
}: QsLinearGradientData): string => {
  return qsCreateCustomStopLinearGradient({
    canvas,
    gradientId,
    colorStops: createColorStops(colors),
    x1,
    y1,
    x2,
    y2,
  })
}

export const qsCreateCustomStopRadialGradient = ({
  canvas,
  gradientId,
  colorStops,
  cx = '50%',
  cy = '50%',
  r = '50%',
}: QsRadialGradientColorStopData): string => {
  const defs: any = canvas.canvasSVG.append('defs')

  const gradient: d3.Selection<
    SVGRadialGradientElement,
    unknown,
    SVGGElement,
    unknown
  > = defs
    .append('radialGradient')
    .attr('id', gradientId)
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', r)

  addColorsToGradient(colorStops, gradient)
  return `url(#${gradientId})`
}

export const qsCreateRadialGradient = ({
  canvas,
  gradientId,
  colors,
  cx = '50%',
  cy = '50%',
  r = '50%',
}: QsRadialGradientData): string => {
  return qsCreateCustomStopRadialGradient({
    canvas,
    gradientId,
    colorStops: createColorStops(colors),
    cx,
    cy,
    r,
  })
}
