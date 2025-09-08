import { scaleBand, scaleOrdinal, range, stack, ScaleOrdinal, Series } from 'd3'
import { Canvas } from '../../canvas/types'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import {
  BarData,
  BarGroupConfig,
  QsCalculatedDataOrthogonalBarGroups,
} from './types'
import { QsBarGroupedData } from './qsTypes'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsBarGroupedData[][],
  config: BarGroupConfig
): QsCalculatedDataOrthogonalBarGroups[] => {
  const { displayAreaWidth } = canvas.config
  const { yDataScale } = canvas.scales
  const {
    padding,
    defaultStrokeColor,
    defaultStrokeOpacity,
    defaultStrokeWidth,
    defaultFillOpacity,
  } = config
  const calculatedData: QsCalculatedDataOrthogonalBarGroups[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: QsBarGroupedData): number => yDataScale(d.value)
  const x = (outer: number, inner: number): number => {
    //TODO requires error handling
    const bandVal = xBandScale(outer.toString())
    if (bandVal)
      return bandVal + (xBandScale.bandwidth() / data[0].length) * inner
    return 0
  }

  const height = (d: QsBarGroupedData) => yDataScale(0) - yDataScale(d.value)
  const width = () => xBandScale.bandwidth() / data[0].length
  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  data.forEach((d, outer) => {
    const barIds = d.map(() => `barGrouped${uuidv4()}`)
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: barIds[inner],
        x: x(outer, inner),
        y: y(d),
        height: height(d),
        width: width(),
        fillColor: d.fillColor ?? getColor(inner, colors),
        fillOpacity: d.fillOpacity ?? defaultFillOpacity,
        strokeColor: d.strokeColor ?? defaultStrokeColor,
        strokeWidth: d.strokeWidth ?? defaultStrokeWidth,
        strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
      }
    })
    calculatedData.push({
      groupId: `group${outer}`,
      barData: data,
    })
  })
  return calculatedData
}
