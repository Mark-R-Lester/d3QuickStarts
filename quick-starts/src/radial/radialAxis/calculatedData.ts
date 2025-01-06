import { scaleLinear, scaleOrdinal, ScaleOrdinal, ScaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/conversion'
import {
  QsEnumTextFont,
  QsEnumTextFontStyle,
  QsEnumTextFontWeight,
  QsEnumTextDecorationLine,
  QsEnumTextAnchor,
  QsEnumAlignmentBaseline,
} from '../../core/enums/qsEnums'
import { Canvas } from '../../d3QuickStart'

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface CalculatedData {
  [key: string]: string | RingData | number
  ringId: string
  textId: string
  ringClass: string
  textClass: string
  ringData: RingData
  x: number
  y: number
  textFontSize: number
}

export interface RadialAxisConfigStrict {
  [key: string]: number | undefined | string
  radius: number
  x: number
  y: number
  axisAngle: number
  gap: number
  fillColor: string
  strokeWidth: number
  textFont: QsEnumTextFont | string
  textFontSize: number
  textFontStyle: QsEnumTextFontStyle
  textFontWeight: QsEnumTextFontWeight | number
  textDecorationLine: QsEnumTextDecorationLine
  textFill: string
  textAnchor: QsEnumTextAnchor
  textStroke: string
  textAlignmentBaseline: QsEnumAlignmentBaseline
}

export const getCalculatedData = (
  canvas: Canvas,
  data: number[],
  config: RadialAxisConfigStrict
): CalculatedData[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { radius, axisAngle, gap, x, y, textFontSize } = config

  const calculatedData: CalculatedData[] = []
  const ordinal = data.some((d) => typeof d === 'string')

  let ordialScale: ScaleOrdinal<string, unknown, never>
  let linearScale: ScaleLinear<number, number, never>
  if (ordinal) {
    ordialScale = scaleOrdinal().domain(toStrings(data)).range(data)
  } else {
    linearScale = scaleLinear()
      .domain([1, data.length])
      .range([lowestViewableValue, highestViewableValue])
  }

  const nunberOfArcs = data.length
  const bandWidth = yPercentScale(radius / 2 / (nunberOfArcs - 1))

  data.forEach((d, i) => {
    const radians = axisAngle * (Math.PI / 180)
    const calculateTextPosition = () => {
      const hypotenuse: number = bandWidth * i
      const relativeX: number = Math.sin(radians) * hypotenuse
      const relativeY: number = Math.cos(radians) * hypotenuse * -1
      return [
        relativeX + displayAreaWidth / 2 + xPercentScale(-50 + x),
        relativeY + displayAreaHeight / 2 + yPercentScale(-50 + y),
      ]
    }
    const sin: number = gap / (bandWidth * (i + 1))
    let text: unknown
    if (ordinal) text = ordialScale(d.toString())
    else text = linearScale(i + 1)

    const handleText = (text: unknown): string => {
      if (typeof text === 'string') return text
      else if (typeof text === 'number')
        return (Math.round(text * 10) / 10).toString()
      else return ''
    }

    calculatedData.push({
      ringId: `ring${uuidv4()}`,
      textId: `ringText${uuidv4()}`,
      ringClass: `ring`,
      textClass: `ringText`,

      ringData: {
        innerRadius: bandWidth * i,
        outerRadius: bandWidth * i,
        startAngle: radians + Math.asin(sin),
        endAngle: radians + Math.PI * 2 - Math.asin(sin),
        textLocation: calculateTextPosition(),
        text: handleText(text),
      },
      x: xPercentScale(x),
      y: yPercentScale(y),
      textFontSize: genralPercentScale(textFontSize),
    })
  })
  return calculatedData
}
