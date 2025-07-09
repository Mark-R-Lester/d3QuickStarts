import { QsColorStop } from './gradients'

export const addColorsToGradient = (
  stops: QsColorStop[],
  gradient:
    | d3.Selection<SVGLinearGradientElement, unknown, SVGGElement, unknown>
    | d3.Selection<SVGRadialGradientElement, unknown, SVGGElement, unknown>
) => {
  stops.forEach((stop: { color: string; offset: number }) => {
    gradient
      .append('stop')
      .attr('offset', `${stop.offset}%`)
      .attr('stop-color', stop.color)
  })
}
