import { scaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { RadialTextConfig } from './types'
import { QsRadialTextData } from './qsTypes'
import { QsCoordinate } from '../../core/types/qsTypes'
import { Canvas } from '../../core/canvas/canvas'
import { TextData } from '../../core/types/types'

export interface CalculatedData extends TextData {
  id: string
  coordinate: QsCoordinate
  x: number
  y: number
  text?: string
  newText?: string
  value: number
  newValue: number
  defaultDecimalPoints: number
}

export const updateCalculatedData = (
  canvas: Canvas,
  args: QsRadialTextData[],
  config: RadialTextConfig,
  calculatedData: CalculatedData[]
): CalculatedData[] => {
  const newCalculatedData: CalculatedData[] = getCalculatedData(
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
  data: QsRadialTextData[],
  config: RadialTextConfig
): CalculatedData[] => {
  const { lowestViewableValue, highestViewableValue, displayAreaHeight } =
    canvas.config
  const { genralPercentScale, xPercentScale, yPercentScale } = canvas.scales
  const {
    x,
    y,
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

  const calculatedData: CalculatedData[] = []
  const angleScale = scaleLinear()
    .domain([0, data.length])
    .range([0, 2 * Math.PI])
  const radialScale = scaleLinear()
    .domain([lowestViewableValue, highestViewableValue])
    .range([0, displayAreaHeight / 2])

  data.forEach((d, i) => {
    const radians = angleScale(i)
    const hypotenuse = radialScale(d.value)
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
