import { QsCanvas } from '../../canvas/canvas'
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

interface RingData {
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
  textLocation: number[]
  text: number | string
}

export interface Meta {
  [key: string]: string | RingData | ScaleLinear<number, number, never>
  ringId: string
  textId: string
  ringClass: string
  textClass: string
  ringData: RingData
  xAxis: ScaleLinear<number, number, never>
  yAxis: ScaleLinear<number, number, never>
}

export interface RadialAxisConfigStrict {
  [key: string]: number | Iterable<unknown> | Iterable<string> | undefined
  radius: number
  x: number
  y: number
  axisAngle: number
  gap: number
  color: string
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

export const getMeta = (
  canvas: QsCanvas,
  data: number[],
  config: RadialAxisConfigStrict
): Meta[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { radius, axisAngle, gap, x, y } = config

  const meta: Meta[] = []

  const ordinal = data.some((d) => typeof d === 'string')
  const xAxis = scaleLinear().domain([0, 100]).range([0, displayAreaWidth])
  const yAxis = scaleLinear().domain([0, 100]).range([0, displayAreaHeight])

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
  const bandWidth = yAxis(radius / 2 / (nunberOfArcs - 1))

  data.forEach((d, i) => {
    const radians = axisAngle * (Math.PI / 180)
    const calculateTextPosition = () => {
      const hypotenuse: number = bandWidth * i
      const relativeX: number = Math.sin(radians) * hypotenuse
      const relativeY: number = Math.cos(radians) * hypotenuse * -1
      return [
        relativeX + displayAreaWidth / 2 + xAxis(-50) + xAxis(x),
        relativeY + displayAreaHeight / 2 + yAxis(-50) + yAxis(y),
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

    meta.push({
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
      xAxis,
      yAxis,
    })
  })
  return meta
}
