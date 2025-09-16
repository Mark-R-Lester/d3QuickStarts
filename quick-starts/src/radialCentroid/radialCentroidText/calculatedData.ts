import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { QsCalculatedDataCentroidText, CentroidTextConfig } from './types'
import { QsCentroidTextData } from './qsTypes'
import { QsCoordinate } from '../../core/types/qsTypes'
import { Canvas } from '../../canvas/types'

export const updateCalculatedData = (
  canvas: Canvas,
  args: QsCentroidTextData[],
  config: CentroidTextConfig,
  calculatedData: QsCalculatedDataCentroidText[]
): QsCalculatedDataCentroidText[] => {
  const newCalculatedData: QsCalculatedDataCentroidText[] = getCalculatedData(
    canvas,
    args,
    config
  )
  for (let i = 0; i < calculatedData.length; i++) {
    newCalculatedData[i].text = calculatedData[i].text
    newCalculatedData[i].value = calculatedData[i].value
  }
  return newCalculatedData
}

export const getCalculatedData = (
  canvas: Canvas,
  data: QsCentroidTextData[],
  config: CentroidTextConfig
): QsCalculatedDataCentroidText[] => {
  const {
    genralPercentScale,
    xPercentScale,
    yPercentScale,
    radialDataScale,
    radialPercentScale,
  } = canvas.scales
  const {
    x,
    y,
    fixedPosition,
    fixedPositionActive,
    defaultTextFont,
    defaultTextFontSize,
    defaultTextFontStyle,
    defaultTextFontWeight,
    defaultTextDecorationLine,
    defaultTextFill,
    defaultTextAngle,
    defaultTextAnchor,
    defaultTextStroke,
    defaultTextAlignmentBaseline,
    defaultDecimalPoints,
  } = config

  const calculatedData: QsCalculatedDataCentroidText[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])

  data.forEach((d, i) => {
    const radians = angleScale(i)
    const hypotenuse = fixedPositionActive
      ? radialPercentScale(fixedPosition)
      : radialDataScale(d.positionalValue ?? d.value)

    const coordinate: QsCoordinate = {
      x: Math.sin(radians) * hypotenuse,
      y: Math.cos(radians) * hypotenuse * -1,
    }

    calculatedData.push({
      id: `radialText${uuidv4()}`,
      coordinate,
      text: d.text,
      newText: d.text,
      value: d.value,
      newValue: d.value,
      x: xPercentScale(x),
      y: yPercentScale(y),
      textFont: d.textFont ?? defaultTextFont,
      textFontSize: genralPercentScale(d.textFontSize ?? defaultTextFontSize),
      textFontStyle: d.textFontStyle ?? defaultTextFontStyle,
      textFontWeight: d.textFontWeight ?? defaultTextFontWeight,
      textDecorationLine: d.textDecorationLine ?? defaultTextDecorationLine,
      textFill: d.textFill ?? defaultTextFill,
      textAngle: d.textAngle ?? defaultTextAngle,
      textAnchor: d.textAnchor ?? defaultTextAnchor,
      textStroke: d.textStroke ?? defaultTextStroke,
      textAlignmentBaseline:
        d.textAlignmentBaseline ?? defaultTextAlignmentBaseline,
      defaultDecimalPoints,
    })
  })

  return calculatedData
}
