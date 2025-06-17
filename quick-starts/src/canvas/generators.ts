import {
  Canvas,
  QsArea,
  QsAreaConfig,
  QsAreaData,
  QsAxis,
  QsAxisConfig,
  QsBarConfig,
  QsBarData,
  QsBarGroupConfig,
  QsBarGroups,
  QsBars,
  QsBarStack,
  QsBarStackedConfig,
  QsLegend,
  QsLegendConfig,
  QsLegendData,
  QsLine,
  QsLineConfig,
  QsLineData,
  QsLinePlot,
  QsPlottedLineConfig,
  QsPointData,
  QsPoints,
  QsPointsConfig,
  QsRadial,
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAxis,
  QsRadialAxisConfig,
  QsRadialArcConfig,
  QsRadialData,
  QsRadialLine,
  QsRadialLineConfig,
  QsRadialLineData,
  QsRadialPointData,
  QsRadialPoints,
  QsRadialPointsConfig,
  QsRadialSpokes,
  QsRadialSpokesConfig,
  QsRadialText,
  QsRadialTextConfig,
  QsPlottedPoints,
  QsPlottedPointsConfig,
  QsPlottedPointsData,
  QsPlottedText,
  QsPlottedTextArgs,
  QsPlottedTextConfig,
  QsValuedText,
  QsPlottedLineData,
  QsText,
  QsTextConfig,
  QsTextData,
} from '../d3QuickStart'
import { plottedLegend } from '../legend/legend'
import { linearArea } from '../linear/linearArea/area'
import { linearAxis } from '../linear/linearAxis/axis'
import { linearBar } from '../linear/linearBar/bar'
import { linearBarGroup } from '../linear/linearBarGroup/barGroup'
import { linearBarStack } from '../linear/linearBarStack/barStack'
import { linearLine } from '../linear/linearLine/line'
import { linearPoint } from '../linear/linearPoints/points'
import { linearText } from '../linear/linearText/text'
import { plottedLine } from '../plots/plottedLine/plottedLine'
import { plottedPoint } from '../plots/plottedPoints/plottedPoints'
import { plottedText } from '../plots/plottedText/plottedText'
import { radialArc } from '../radialArc/radialArc/radialArc'
import { radialText } from '../radialArc/radialArcText/radialArcText'
import { radialArea } from '../radialCentroid/radialCentroidArea/radialCentroidArea'
import { radialAxis } from '../radialCentroid/radialCentroidAxis/radialCentroidAxis'
import { radialLine } from '../radialCentroid/radialCentroidLine/radialCentroidLine'
import { radialPoint } from '../radialCentroid/radialCentroidPoints/radialCentroidPoints'
import { radialSpokes } from '../radialCentroid/radialCentroidSpokes/radialCentroidSpokes'

interface ElementWithData {
  element: any
  data: any
}

interface horizontalLinearAxisFunctions {
  bottom: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  top: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface horizontalLinearElementFunctions {
  area: (data: QsAreaData, customConfig?: QsAreaConfig) => QsArea
  barGroup: (data: number[][], customConfig?: QsBarGroupConfig) => QsBarGroups
  barStack: (data: number[][], customConfig?: QsBarStackedConfig) => QsBarStack
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  text: (data: QsTextData[], customConfig?: QsTextConfig) => QsText
  axis: horizontalLinearAxisFunctions
}

interface verticalLinearAxisFunctions {
  left: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  right: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface verticalLinearElementFunctions {
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  text: (data: QsTextData[], customConfig?: QsTextConfig) => QsText
  axis: verticalLinearAxisFunctions
}

interface linearElementFunctions {
  horizontal: horizontalLinearElementFunctions
  vertical: verticalLinearElementFunctions
}

interface plottedElementFunctions {
  legend: (data: QsLegendData[], customConfig?: QsLegendConfig) => {}
  line: (data: QsPlottedLineData, customConfig?: QsPlottedLineConfig) => {}
  text: (data: QsPlottedTextArgs[], customConfig?: QsPlottedTextConfig) => {}
  points: (
    data: QsPlottedPointsData[],
    customConfig?: QsPlottedPointsConfig
  ) => {}
}

interface radialArcTextElementFunctions {
  follow: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  horizontal: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  rotated: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  spoke: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
}

interface radialArcElementFunctions {
  radial: (data: QsRadialData[], customConfig?: QsRadialArcConfig) => QsRadial
  text: radialArcTextElementFunctions
}

interface radialCentroidElementFunctions {
  area: (
    data: QsRadialAreaData,
    customConfig?: QsRadialAreaConfig
  ) => QsRadialArea
  axis: (data: number[], customConfig?: QsRadialAxisConfig) => QsRadialAxis
  line: (
    data: QsRadialLineData,
    customConfig?: QsRadialLineConfig
  ) => QsRadialLine
  points: (
    data: QsRadialPointData[],
    customConfig?: QsRadialPointsConfig
  ) => QsRadialPoints
  spokes: (data: number, customConfig?: QsRadialSpokesConfig) => QsRadialSpokes
}

export interface QsGenerator {
  linear: linearElementFunctions
  radialArc: radialArcElementFunctions
  radialCentroid: radialCentroidElementFunctions
  plotted: plottedElementFunctions
}

const elements: ElementWithData[] = []

export const getGenerators = (canvas: Canvas): QsGenerator => {
  return {
    linear: {
      horizontal: {
        area: (data: QsAreaData, customConfig?: QsAreaConfig): QsArea => {
          const element = linearArea.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barGroup: (
          data: number[][],
          customConfig?: QsBarGroupConfig
        ): QsBarGroups => {
          const element = linearBarGroup.group(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barStack: (
          data: number[][],
          customConfig?: QsBarStackedConfig
        ): QsBarStack => {
          const element = linearBarStack.stack(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = linearBar.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = linearLine.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = linearPoint.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        text: (data: QsTextData[], customConfig?: QsTextConfig): QsText => {
          const element = linearText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        axis: {
          bottom: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.xAxisBottom(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          top: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.xAxisTop(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
        },
      },
      vertical: {
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = linearBar.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = linearLine.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = linearPoint.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        text: (data: QsTextData[], customConfig?: QsTextConfig): QsText => {
          const element = linearText.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        axis: {
          left: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.yAxisLeft(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          right: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.yAxisRight(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
        },
      },
    },
    plotted: {
      legend: (
        data: QsLegendData[],
        customConfig?: QsLegendConfig
      ): QsLegend => {
        const element = plottedLegend.legend(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsPlottedLineData,
        customConfig?: QsPlottedLineConfig
      ): QsLinePlot => {
        const element = plottedLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (
        data: QsPlottedTextArgs[],
        customConfig?: QsPlottedTextConfig
      ): QsPlottedText => {
        const element = plottedText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsPlottedPointsData[],
        customConfig?: QsPlottedPointsConfig
      ): QsPlottedPoints => {
        const element = plottedPoint.points(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
    radialArc: {
      radial: (
        data: QsRadialData[],
        customConfig?: QsRadialArcConfig
      ): QsRadial => {
        const element = radialArc.radial(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: {
        follow: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        spoke: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.spoke(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
      },
    },
    radialCentroid: {
      area: (
        data: QsRadialAreaData,
        customConfig?: QsRadialAreaConfig
      ): QsRadialArea => {
        const element = radialArea.area(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      axis: (
        data: number[],
        customConfig?: QsRadialAxisConfig
      ): QsRadialAxis => {
        const element = radialAxis.rings(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsRadialLineData,
        customConfig?: QsRadialLineConfig
      ): QsRadialLine => {
        const element = radialLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsRadialPointData[],
        customConfig?: QsRadialPointsConfig
      ): QsRadialPoints => {
        const element = radialPoint.points(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      spokes: (
        data: number,
        customConfig?: QsRadialSpokesConfig
      ): QsRadialSpokes => {
        const element = radialSpokes.spokes(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
  }
}
