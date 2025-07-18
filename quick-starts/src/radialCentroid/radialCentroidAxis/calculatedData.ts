import { scaleLinear, scaleOrdinal, ScaleOrdinal, ScaleLinear } from 'd3'
import { v4 as uuidv4 } from 'uuid'
import { toStrings } from '../../core/math/conversion'
import { Canvas } from '../../core/canvas/canvas'
import { RadialAxisConfig, CalculatedData } from './types'

export const getCalculatedData = (
  canvas: Canvas,
  data: number[],
  config: RadialAxisConfig
): CalculatedData[] => {
  const {
    displayAreaHeight,
    displayAreaWidth,
    lowestViewableValue,
    highestViewableValue,
  } = canvas.config
  const { xPercentScale, yPercentScale, genralPercentScale } = canvas.scales
  const { radius, axisAngle, gap, x, y, textFontSize, strokeWidth } = config

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
  const bandWidth = genralPercentScale(radius / 2 / (nunberOfArcs - 1))

  data.forEach((d, i) => {
    const radians = Math.PI * 2

    const calculateTextPosition = () => {
      const hypotenuse: number = bandWidth * i
      const relativeX: number = Math.sin(radianAngle) * hypotenuse
      const relativeY: number = Math.cos(radianAngle) * hypotenuse * -1
      return [
        relativeX + displayAreaWidth / 2 + xPercentScale(-50 + x),
        relativeY + displayAreaHeight / 2 + yPercentScale(-50 + y),
      ]
    }

    let text: unknown
    if (ordinal) text = ordialScale(d.toString())
    else text = linearScale(i + 1)

    const handleText = (text: unknown): string => {
      if (typeof text === 'string') return text
      else if (typeof text === 'number')
        return (Math.round(text * 10) / 10).toString()
      else return ''
    }

    const radianAngle = axisAngle * (Math.PI / 180)
    const halfGap = genralPercentScale(gap / 2) / (bandWidth * i)

    calculatedData.push({
      ringId: `ring${uuidv4()}`,
      textId: `ringText${uuidv4()}`,

      ringData: {
        innerRadius: bandWidth * i,
        outerRadius: bandWidth * i,
        startAngle: radianAngle + halfGap,
        endAngle: radianAngle + radians - halfGap,
        textLocation: calculateTextPosition(),
        text: handleText(text),
      },
      x: xPercentScale(x),
      y: yPercentScale(y),
      textFontSize: genralPercentScale(textFontSize),
      strokeWidth: genralPercentScale(strokeWidth),
    })
  })

  return calculatedData
}
