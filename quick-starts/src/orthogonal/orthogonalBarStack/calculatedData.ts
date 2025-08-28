import { scaleBand, scaleOrdinal, range, stack, ScaleOrdinal, Series } from 'd3'
import { Canvas } from '../../canvas/types'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import { BarData, BarStackedConfig, CalculatedData } from './types'
import { QsBarStackedData } from './qsTypes'

export const getCalculatedData = (
  canvas: Canvas,
  data: QsBarStackedData[][],
  config: BarStackedConfig
): CalculatedData[] => {
  const { displayAreaWidth } = canvas.config
  const { yDataScale } = canvas.scales
  const {
    padding,
    defaultStrokeColor,
    defaultStrokeOpacity,
    defaultStrokeWidth,
    defaultFillOpacity,
  } = config

  const calculatedData: CalculatedData[] = []

  const colors = scaleOrdinal()
    .domain(toStrings(range([...config.colorRange].length)))
    .range(config.colorRange)

  const xBandScale = scaleBand()
    .domain(toStrings(range(data.length)))
    .range([0, displayAreaWidth])
    .paddingInner(padding / 200)
    .paddingOuter(padding / 200)

  const y = (d: QsBarStackedDataEnhanced): number => yDataScale(d.high)
  const x = (outer: string): number => {
    //TODO requires error handling
    const bandVal = xBandScale(outer)
    if (bandVal) return bandVal
    return 0
  }

  const height = (d: QsBarStackedDataEnhanced) =>
    yDataScale(d.low) - yDataScale(d.high)
  const width = xBandScale.bandwidth()

  const getColor = (
    i: number,
    colorScale: ScaleOrdinal<string, unknown, never>
  ): string => {
    let c: string | unknown = colorScale(i.toString())
    //TODO if c is not a string throw.
    return typeof c == 'string' ? c : '#cbc9e2'
  }

  interface QsBarStackedDataEnhanced extends QsBarStackedData {
    low: number
    high: number
  }
  const stackData = (
    data: QsBarStackedData[][]
  ): QsBarStackedDataEnhanced[][] => {
    return data.map((series) =>
      series.map((item, i, arr) => ({
        ...item,
        low: arr.slice(0, i).reduce((sum, prev) => sum + prev.value, 0),
        high: arr.slice(0, i + 1).reduce((sum, curr) => sum + curr.value, 0),
      }))
    )
  }

  const stackedData = stackData(data)

  stackedData.forEach((d, outer) => {
    const data: BarData[] = d.map((d, inner): BarData => {
      return {
        id: `${`barStacked${uuidv4()}`}`,
        x: x(outer.toString()),
        y: y(d),
        height: height(d),
        width: width,
        fillColor: d.fillColor ?? getColor(inner, colors),
        fillOpacity: d.fillOpacity ?? defaultFillOpacity,
        strokeColor: d.strokeColor ?? defaultStrokeColor,
        strokeWidth: d.strokeWidth ?? defaultStrokeWidth,
        strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
      }
    })
    calculatedData.push({
      groupId: `stack${outer}`,
      barData: data,
    })
  })

  return calculatedData
}
