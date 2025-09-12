import { ScaleOrdinal, ScaleSequential } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import {
  QsCalculatedDataArc,
  ArcConfig,
  ArcData,
  ArcEnvelopeConfig,
  ArcSegmentConfig,
} from './types'
import {
  findOrdinalValue,
  getColorScale,
  getPrecidendedColor,
  getScaledColor,
} from '../../core/color/color'

import { Canvas } from '../../canvas/types'
import { QsEnumColorScale } from '../../core/enums/qsEnums'

export const updateCalculatedData = (
  canvas: Canvas,
  data: ArcData[],
  config: ArcConfig | ArcEnvelopeConfig | ArcSegmentConfig,
  calculatedData: QsCalculatedDataArc[]
): QsCalculatedDataArc[] => {
  const newCalculatedData: QsCalculatedDataArc[] = getCalculatedData(
    canvas,
    data,
    config
  )

  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].id = calculatedData[i].id
    newCalculatedData[i].arcData.endAngle = calculatedData[i].arcData.endAngle
    newCalculatedData[i].arcData.startAngle =
      calculatedData[i].arcData.startAngle
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: ArcData[],
  config: ArcConfig | ArcEnvelopeConfig | ArcSegmentConfig
): QsCalculatedDataArc[] => {
  const { xPercentScale, yPercentScale, genralPercentScale, radialDataScale } =
    canvas.scales
  const {
    innerRadius,
    cornerRadius,
    x,
    y,
    defaultFillColor,
    defaultFillOpacity,
    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,
    fillColorScaleData,
    strokeColorScaleData,
  } = config

  const outerRadius: number | undefined =
    'outerRadius' in config ? config.outerRadius : undefined
  let padding = genralPercentScale(config.padding)

  const calculatedData: QsCalculatedDataArc[] = []

  let totalValue = 0
  data.forEach((d) => {
    totalValue = totalValue + d.valueArc
  })

  let fillColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (fillColorScaleData) fillColorScale = getColorScale(fillColorScaleData)

  let strokeColorScale:
    | ScaleSequential<string, never>
    | ScaleOrdinal<string, unknown, never>
    | undefined

  if (strokeColorScaleData)
    strokeColorScale = getColorScale(strokeColorScaleData)

  const radiansDividedByTotalValue = (Math.PI * 2) / totalValue
  let startAngle = 0

  data.forEach((d, i) => {
    const endAngle = startAngle + radiansDividedByTotalValue * d.valueArc

    const scaledFillColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : d.valueArc,
      fillColorScale
    )
    const scaledStrokeColor: string | unknown | undefined = getScaledColor(
      fillColorScaleData?.type === QsEnumColorScale.ORDINAL
        ? findOrdinalValue(i, fillColorScaleData)
        : d.valueArc,
      strokeColorScale
    )

    calculatedData.push({
      id: `arc${uuidv4()}`,
      x: xPercentScale(x),
      y: yPercentScale(y),

      arcData: {
        data: d.valueArc,
        fillColor: getPrecidendedColor(
          d.fillColor,
          defaultFillColor,
          scaledFillColor
        ),
        strokeColor: getPrecidendedColor(
          d.strokeColor,
          defaultStrokeColor,
          scaledStrokeColor
        ),
        index: i,
        value: d.valueArc,
        cornerRadius: yPercentScale(cornerRadius / 2),
        outerRadius: d.valueRad
          ? radialDataScale(d.valueRad)
          : yPercentScale(outerRadius ? outerRadius / 2 : 50),
        innerRadius:
          innerRadius === 0 ? innerRadius : yPercentScale(innerRadius / 2),
        startAngle,
        newStartAngle: startAngle,
        endAngle,
        padding,
        newEndAngle: endAngle,
        fillOpacity: d.fillOpacity ?? defaultFillOpacity,
        strokeWidth: genralPercentScale(d.strokeWidth ?? defaultStrokeWidth),
        strokeOpacity: d.strokeOpacity ?? defaultStrokeOpacity,
      },
    })
    startAngle = endAngle
  })
  return calculatedData
}
