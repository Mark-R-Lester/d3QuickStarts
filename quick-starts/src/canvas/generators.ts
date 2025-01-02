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
import { plottedLegend } from '../legend/legend'
import { linearArea } from '../linear/area/area'
import { linearAxis } from '../linear/axis/axis'
import { linearBar } from '../linear/bar/bar'
import { linearBarGroup } from '../linear/barGroup/barGroup'
import { linearBarStack } from '../linear/barStack/barStack'
import { linearLine } from '../linear/line/line'
import { linearPoint } from '../linear/points/points'
import { plottedLine } from '../plots/linePlot/linePlot'
import { plottedPoint } from '../plots/scatterPlot/scatterPlot'
import { plottedText } from '../plots/text/text'
import { radialSwept } from '../radial/radial/radial'
import { radialArea } from '../radial/radialArea/radialArea'
import { radialAxis } from '../radial/radialAxis/radialAxis'
import { radialLine } from '../radial/radialLine/radialLine'
import { radialPoint } from '../radial/radialPoints/radialPoints'
import { radialSpokes } from '../radial/radialSpokes/radialSpokes'
import { radialText } from '../radial/radialText/radialText'

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
        lineBanded: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = linearLine.horizontalBanded(
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
          const element = linearPoint.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        pointsBanded: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = linearPoint.horizontalBanded(
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
            const element = linearAxis.xAxisBottom(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          bottomBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.xAxisBottomBanded(
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
            const element = linearAxis.xAxisTop(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          topBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.xAxisTopBanded(
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
          const element = linearBar.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = linearLine.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        lineBanded: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = linearLine.verticalBanded(canvas, data, customConfig)
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
        pointsBanded: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = linearPoint.verticalBanded(canvas, data, customConfig)
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
          leftBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.yAxisLeftBanded(
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
            const element = linearAxis.yAxisRight(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          rightBanded: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = linearAxis.yAxisRightBanded(
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
        const element = plottedLegend.legend(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      line: (
        data: QsCoordinate[],
        customConfig?: QsLinePlotConfig
      ): QsLinePlot => {
        const element = plottedLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (data: QsTextArgs[], customConfig?: QsTextConfig): QsText => {
        const element = plottedText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      points: (
        data: QsCoordinateEnhanced[],
        customConfig?: QsScatterPlotConfig
      ): QsScatterPlot => {
        const element = plottedPoint.points(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
    radial: {
      radial: (
        data: QsRadialData[],
        customConfig?: QsRadialConfig
      ): QsRadial => {
        const element = radialSwept.radial(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
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
      text: {
        follow: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        followBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.followBanded(canvas, data, customConfig)
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
        horizontalBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.horizontalBanded(
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
          const element = radialText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotatedBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.rotatedBanded(canvas, data, customConfig)
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
        spokeBanded: (
          data: QsValuedText[],
          customConfig?: QsRadialTextConfig
        ): QsRadialText => {
          const element = radialText.spokeBanded(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
      },
    },
  }
}
