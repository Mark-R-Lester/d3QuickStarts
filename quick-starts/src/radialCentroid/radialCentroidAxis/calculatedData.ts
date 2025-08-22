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
    axisAngle,
    gap,
    x,
    y,
    numberOfRings,
    ordinalScale: oScale,
    textFontSize,
    strokeWidth,
    strokeColor,
    strokeOpacity,
    textFont,
    textFontStyle,
    textFontWeight,
    textDecorationLine,
    textFill,
    textStroke,
    textAlignmentBaseline,
    textAnchor,
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

  const radians = axisAngle * (Math.PI / 180)
  const bandWidth = genralPercentScale(radius / 2 / numberOfRings)

  for (let i = 0; i < numberOfRings + 1; i++) {
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

    const halfGap = genralPercentScale(gap / 2) / (bandWidth * i)

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
      textFontSize: genralPercentScale(textFontSize),
      strokeWidth: genralPercentScale(strokeWidth),

      strokeColor,
      strokeOpacity,
      textFont,
      textFontStyle,
      textFontWeight,
      textDecorationLine,
      textFill,
      textAnchor,
      textStroke,
      textAlignmentBaseline,
    })
  }

  return calculatedData
}
