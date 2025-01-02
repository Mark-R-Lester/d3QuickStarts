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
  QsCoordinate,
  QsCoordinateEnhanced,
  QsLegend,
  QsLegendConfig,
  QsLegendData,
  QsLine,
  QsLineConfig,
  QsLineData,
  QsLinePlot,
  QsLinePlotConfig,
  QsPointData,
  QsPoints,
  QsPointsConfig,
  QsRadial,
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialAxis,
  QsRadialAxisConfig,
  QsRadialConfig,
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
  QsScatterPlot,
  QsScatterPlotConfig,
  QsText,
  QsTextArgs,
  QsTextConfig,
  QsValuedText,
} from '../d3QuickStart'
import { qsLegendGenerator } from '../legend/legend'
import { qsLinearAreaGenerator } from '../linear/area/area'
import { qsLinearAxisGenerator } from '../linear/axis/axis'
import { qsLinearBarGenerator } from '../linear/bar/bar'
import { qsLinearBarGroupGenerator } from '../linear/barGroup/barGroup'
import { qsLinearBarStackGenerator } from '../linear/barStack/barStack'
import { qsLinearLineGenerator } from '../linear/line/line'
import { qsLinearPointGenerator } from '../linear/points/points'
import { qsPlottedLineGenerator } from '../plots/linePlot/linePlot'
import { qsPlottedPointGenerator } from '../plots/scatterPlot/scatterPlot'
import { qsPlottedTextGenerator } from '../plots/text/text'
import { qsRadialGenerator } from '../radial/radial/radial'
import { qsRadialAreaGenerator } from '../radial/radialArea/radialArea'
import { qsRadialAxisGenerator } from '../radial/radialAxis/radialAxis'
import { qsRadialLineGenerator } from '../radial/radialLine/radialLine'
import { qsRadialPointGenerator } from '../radial/radialPoints/radialPoints'
import { qsRadialSpokesGenerator } from '../radial/radialSpokes/radialSpokes'
import { qsRadialTextGenerator } from '../radial/radialText/radialText'

interface ElementWithData {
  element: any
  data: any
}

interface QsHorizontalLinearAxisFunctions {
  bottom: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  bottomBanded: (
    data: number[] | string[],
    customConfig?: QsAxisConfig
  ) => QsAxis
  top: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  topBanded: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface QsHorizontalLinearElementFunctions {
  area: (data: QsAreaData, customConfig?: QsAreaConfig) => QsArea
  barGroup: (data: number[][], customConfig?: QsBarGroupConfig) => QsBarGroups
  barStack: (data: number[][], customConfig?: QsBarStackedConfig) => QsBarStack
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  lineBanded: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  pointsBanded: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  axis: QsHorizontalLinearAxisFunctions
}

interface QsVerticalLinearAxisFunctions {
  left: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  leftBanded: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  right: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  rightBanded: (
    data: number[] | string[],
    customConfig?: QsAxisConfig
  ) => QsAxis
}

interface QsVerticalLinearElementFunctions {
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  lineBanded: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  pointsBanded: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  axis: QsVerticalLinearAxisFunctions
}

interface QsLinearElementFunctions {
  horizontal: QsHorizontalLinearElementFunctions
  vertical: QsVerticalLinearElementFunctions
}

interface QsPlottedElementFunctions {
  legend: (data: QsLegendData[], customConfig?: QsLegendConfig) => {}
  line: (data: QsCoordinate[], customConfig?: QsLinePlotConfig) => {}
  text: (data: QsTextArgs[], customConfig?: QsTextConfig) => {}
  points: (
    data: QsCoordinateEnhanced[],
    customConfig?: QsScatterPlotConfig
  ) => {}
}

interface QsRadialTextElementFunctions {
  follow: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  followBanded: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  horizontal: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  horizontalBanded: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  rotated: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  rotatedBanded: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  spoke: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
  spokeBanded: (
    data: QsValuedText[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
}

interface QsRadialElementFunctions {
  radial: (data: QsRadialData[], customConfig?: QsRadialConfig) => QsRadial
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
  text: QsRadialTextElementFunctions
}

export interface QsGenerator {
  linear: QsLinearElementFunctions
  radial: QsRadialElementFunctions
  plotted: QsPlottedElementFunctions
}

const elements: ElementWithData[] = []

export const getGenerators = (canvas: Canvas): QsGenerator => {
  return {
    linear: {
      horizontal: {
        area: (data: QsAreaData, customConfig?: QsAreaConfig): QsArea => {
          const element = qsLinearAreaGenerator.horizontal(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        barGroup: (
          data: number[][],
          customConfig?: QsBarGroupConfig
        ): QsBarGroups => {
          const element = qsLinearBarGroupGenerator.group(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        barStack: (
          data: number[][],
          customConfig?: QsBarStackedConfig
        ): QsBarStack => {
          const element = qsLinearBarStackGenerator.stack(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = qsLinearBarGenerator.horizontal(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = qsLinearLineGenerator.horizontal(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        lineBanded: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = qsLinearLineGenerator.horizontalBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = qsLinearPointGenerator.horizontal(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        pointsBanded: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = qsLinearPointGenerator.horizontalBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        axis: {
          bottom: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.xAxisBottom(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          bottomBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.xAxisBottomBanded(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          top: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.xAxisTop(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          topBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.xAxisTopBanded(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
        },
      },
      vertical: {
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = qsLinearBarGenerator.vertical(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = qsLinearLineGenerator.vertical(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        lineBanded: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = qsLinearLineGenerator.verticalBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = qsLinearPointGenerator.vertical(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        pointsBanded: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = qsLinearPointGenerator.verticalBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        axis: {
          left: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.yAxisLeft(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          leftBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.yAxisLeftBanded(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          right: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.yAxisRight(
              canvas,
              data,
              customConfig
            )
            elements.push({ element, data })
            return element
          },
          rightBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = qsLinearAxisGenerator.yAxisRightBanded(
              canvas,
              data,
              customConfig
            )
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
        const element = qsLegendGenerator.legend(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsCoordinate[],
        customConfig?: QsLinePlotConfig
      ): QsLinePlot => {
        const element = qsPlottedLineGenerator.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (data: QsTextArgs[], customConfig?: QsTextConfig): QsText => {
        const element = qsPlottedTextGenerator.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsCoordinateEnhanced[],
        customConfig?: QsScatterPlotConfig
      ): QsScatterPlot => {
        const element = qsPlottedPointGenerator.points(
          canvas,
          data,
          customConfig
        )
        elements.push({ element, data })
        return element
      },
    },
    radial: {
      radial: (
        data: QsRadialData[],
        customConfig?: QsRadialConfig
      ): QsRadial => {
        const element = qsRadialGenerator.radial(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      area: (
        data: QsRadialAreaData,
        customConfig?: QsRadialAreaConfig
      ): QsRadialArea => {
        const element = qsRadialAreaGenerator.area(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      axis: (
        data: number[],
        customConfig?: QsRadialAxisConfig
      ): QsRadialAxis => {
        const element = qsRadialAxisGenerator.rings(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsRadialLineData,
        customConfig?: QsRadialLineConfig
      ): QsRadialLine => {
        const element = qsRadialLineGenerator.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsRadialPointData[],
        customConfig?: QsRadialPointsConfig
      ): QsRadialPoints => {
        const element = qsRadialPointGenerator.points(
          canvas,
          data,
          customConfig
        )
        elements.push({ element, data })
        return element
      },
      spokes: (
        data: number,
        customConfig?: QsRadialSpokesConfig
      ): QsRadialSpokes => {
        const element = qsRadialSpokesGenerator.spokes(
          canvas,
          data,
          customConfig
        )
        elements.push({ element, data })
        return element
      },
      text: {
        follow: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.follow(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        followBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.followBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.horizontal(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        horizontalBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.horizontalBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.rotated(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        rotatedBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.rotatedBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        spoke: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.spoke(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
        spokeBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = qsRadialTextGenerator.spokeBanded(
            canvas,
            data,
            customConfig
          )
          elements.push({ element, data })
          return element
        },
      },
    },
  }
}
