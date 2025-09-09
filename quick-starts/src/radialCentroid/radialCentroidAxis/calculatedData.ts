import { v4 as uuidv4 } from 'uuid'
import { Canvas } from '../../canvas/types'
import { CentroidAxisConfig, QsCalculatedDataCentroidAxis } from './types'
import {
  adjacentFromHypotenuse,
  oppositeFromHypotenuse,
} from '../../core/math/trigonometricFunctions'
import { QsEnumTickPosition } from './qsEnums'

export const getCalculatedData = (
  canvas: Canvas,
  config: CentroidAxisConfig
): QsCalculatedDataCentroidAxis[] => {
  const { displayAreaHeight, displayAreaWidth, lowestViewableValue } =
    canvas.config
  const {
    xPercentScale,
    yPercentScale,
    genralPercentScale,
    radialDataScale,
    radialTickScale,
  } = canvas.scales
  const {
    showCentralTick,
    defaultAxisAngle,
    defaultGap,
    x,
    y,
    numberOfTicks,
    tickConfig,
    decimalPlaces,

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

  let ticks = radialTickScale.nice().ticks(numberOfTicks)

  if (ticks[0] > lowestViewableValue) ticks.unshift(lowestViewableValue)
  if (ticks[0] < lowestViewableValue) ticks[0] = lowestViewableValue
  if (decimalPlaces !== undefined) {
    ticks = ticks.map((tick) => Number(tick.toFixed(decimalPlaces)))
  }

  const calculatedData: QsCalculatedDataCentroidAxis[] = []
  const gapWidth = genralPercentScale(50 / ticks.length)

  const addToData = (tick: number, index: number) => {
    let currentTickConfig

    if (tickConfig && ticks.length >= 2) {
      const isLastTick = index === ticks.length - 1
      const isFirstTickWithEnoughTicks = index === 1 && ticks.length >= 3
      const isMiddleTick = index > 1 && index < ticks.length - 1

      const targetPosition: QsEnumTickPosition | undefined = isLastTick
        ? QsEnumTickPosition.PERIMETER
        : isFirstTickWithEnoughTicks
          ? QsEnumTickPosition.CORE
          : isMiddleTick
            ? QsEnumTickPosition.INTERMEDIATE
            : undefined

      if (targetPosition) {
        currentTickConfig = tickConfig.find(
          (conf) => conf.tickPosition === targetPosition
        )
      }
    }

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
    } = currentTickConfig ?? {}

    const radians = (axisAngle ?? defaultAxisAngle) * (Math.PI / 180)
    const halfGap =
      genralPercentScale((gap ?? defaultGap) / 2) / (gapWidth * index)

    const calculateTextPosition = () => {
      const hypotenuse: number = radialDataScale(tick)
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

    calculatedData.push({
      tickId: `ring${uuidv4()}`,
      textId: `ringText${uuidv4()}`,

      ringData: {
        innerRadius: radialDataScale(tick),
        outerRadius: radialDataScale(tick),
        startAngle: radians + halfGap,
        endAngle: radians + Math.PI * 2 - halfGap,
        textLocation: calculateTextPosition(),
        text: tick.toString(),
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

  ticks.forEach((tick, index) => {
    if (index > 0 || showCentralTick) addToData(tick, index)
  })

  return calculatedData
}
