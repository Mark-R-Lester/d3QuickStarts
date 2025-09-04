import { scaleLinear, ScaleContinuousNumeric } from 'd3'
import { scaleOrdinal, ScaleOrdinal } from 'd3-scale'
import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../canvas/types'
import { RadialAxisConfig, CalculatedData } from './types'
import {
  adjacentFromHypotenuse,
  oppositeFromHypotenuse,
} from '../../core/math/trigonometricFunctions'

export const getCalculatedData = (
  canvas: Canvas,
  config: RadialAxisConfig
): CalculatedData[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const {
    radius,
    defaultAxisAngle,
    defaultGap,
    x,
    y,
    numberOfRings,
    ordinalScale: oScale,
    ringConfig,

    defaultStrokeColor,
    defaultStrokeWidth,
    defaultStrokeOpacity,

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
  } = config

  const calculatedData: CalculatedData[] = []

  let ordialScale: ScaleOrdinal<string, unknown, never> = scaleOrdinal()
  let linearScale: ScaleContinuousNumeric<number, number> = scaleLinear()
  if (oScale) {
    const domain: string[] = [...Array(numberOfRings).keys()].map((i) =>
      (i + 1).toString()
    )
    ordialScale = scaleOrdinal().domain(domain).range(oScale.range)
  } else {
    const domain: number[] = [0, numberOfRings]
    linearScale = scaleLinear()
      .domain(domain)
      .range([lowestViewableValue, highestViewableValue])
  }

  const bandWidth = genralPercentScale(radius / 2 / numberOfRings)

  for (let i = 0; i < numberOfRings + 1; i++) {
    const ring = ringConfig?.find((ring) => ring.ringNumber === i)
    const {
      axisAngle,
      gap,
      strokeColor,
      strokeOpacity,
      strokeWidth,
      textFont,
      textFontSize,
      textFontStyle,
      textFontWeight,
      textDecorationLine,
      textFill,
      textAngle,
      textAnchor,
      textStroke,
      textAlignmentBaseline,
    } = ring ?? {}

    const radians = (axisAngle ?? defaultAxisAngle) * (Math.PI / 180)
    const halfGap =
      genralPercentScale((gap ?? defaultGap) / 2) / (bandWidth * i)

    const calculateTextPosition = () => {
      const hypotenuse: number = bandWidth * i
      const relativeX: number = oppositeFromHypotenuse({
        hypotenuse,
        radians: radians,
      })
      const relativeY: number =
        adjacentFromHypotenuse({
          hypotenuse,
          radians: radians,
        }) * -1
      return [
        relativeX + displayAreaWidth / 2 + xPercentScale(-50 + x),
        relativeY + displayAreaHeight / 2 + yPercentScale(-50 + y),
      ]
    }

    let text: unknown
    if (oScale) text = ordialScale(i.toString())
    else text = linearScale(i)

    const handleText = (text: unknown): string => {
      if (typeof text === 'string') return text
      else if (typeof text === 'number')
        return (Math.round(text * 10) / 10).toString()
      else return ''
    }

    calculatedData.push({
      ringId: `ring${uuidv4()}`,
      textId: `ringText${uuidv4()}`,

      ringData: {
        innerRadius: bandWidth * i,
        outerRadius: bandWidth * i,
        startAngle: radians + halfGap,
        endAngle: radians + Math.PI * 2 - halfGap,
        textLocation: calculateTextPosition(),
        text: handleText(text),
      },
      x: xPercentScale(x),
      y: yPercentScale(y),

      strokeWidth: genralPercentScale(strokeWidth ?? defaultStrokeWidth),
      strokeColor: strokeColor ?? defaultStrokeColor,
      strokeOpacity: strokeOpacity ?? defaultStrokeOpacity,

      textFontSize: genralPercentScale(textFontSize ?? defaultTextFontSize),
      textFont: textFont ?? defaultTextFont,
      textFontStyle: textFontStyle ?? defaultTextFontStyle,
      textFontWeight: textFontWeight ?? defaultTextFontWeight,
      textDecorationLine: textDecorationLine ?? defaultTextDecorationLine,
      textFill: textFill ?? defaultTextFill,
      textAngle: textAngle ?? defaultTextAngle,
      textAnchor: textAnchor ?? defaultTextAnchor,
      textStroke: textStroke ?? defaultTextStroke,
      textAlignmentBaseline:
        textAlignmentBaseline ?? defaultTextAlignmentBaseline,
    })
  }

  return calculatedData
}
