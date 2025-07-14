import { legend } from '../../unbound/legend/legend'
import {
  QsLegend,
  QsLegendConfig,
  QsLegendData,
} from '../../unbound/legend/qsTypes'
import { linearArea } from '../../linear/linearArea/area'
import {
  QsArea,
  QsAreaConfig,
  QsAreaData,
} from '../../linear/linearArea/qsTypes'
import { linearAxis } from '../../linear/linearAxis/axis'
import { QsAxis, QsAxisConfig } from '../../linear/linearAxis/qsTypes'
import { linearBar } from '../../linear/linearBar/bar'
import { QsBarConfig, QsBarData, QsBars } from '../../linear/linearBar/qsTypes'
import { linearBarGroup } from '../../linear/linearBarGroup/barGroup'
import {
  QsBarGroupConfig,
  QsBarGroupedData,
  QsBarGroups,
} from '../../linear/linearBarGroup/qsTypes'
import { linearBarStack } from '../../linear/linearBarStack/barStack'
import {
  QsBarStack,
  QsBarStackedConfig,
  QsBarStackedData,
} from '../../linear/linearBarStack/qsTypes'
import { linearLine } from '../../linear/linearLine/line'
import {
  QsLine,
  QsLineConfig,
  QsLineData,
} from '../../linear/linearLine/qsTypes'
import { linearPoint } from '../../linear/linearPoints/points'
import {
  QsPointData,
  QsPoints,
  QsPointsConfig,
} from '../../linear/linearPoints/qsTypes'
import { linearText } from '../../linear/linearText/text'
import { plottedLine } from '../../plots/plottedLine/plottedLine'
import {
  QsLinePlot,
  QsPlottedLineConfig,
  QsPlottedLineData,
} from '../../plots/plottedLine/qsTypes'
import { plottedPoint } from '../../plots/plottedPoints/plottedPoints'
import {
  QsPlottedPoints,
  QsPlottedPointsConfig,
  QsPlottedPointsData,
} from '../../plots/plottedPoints/qsTypes'
import { plottedText } from '../../plots/plottedText/plottedText'
import {
  QsPlottedText,
  QsPlottedTextData,
  QsPlottedTextConfig,
} from '../../plots/plottedText/qsTypes'
import {
  QsRadial,
  QsRadialArcConfig,
  QsRadialData,
} from '../../radialArc/radialArc/qsTypes'
import { radialArc } from '../../radialArc/radialArc/radialArc'
import {
  QsRadialArcText,
  QsRadialArcTextConfig,
  QsValuedText,
} from '../../radialArc/radialArcText/qsTypes'
import { radialArcText } from '../../radialArc/radialArcText/radialArcText'
import {
  QsRadialArea,
  QsRadialAreaConfig,
  QsRadialAreaData,
} from '../../radialCentroid/radialCentroidArea/qsTypes'
import { radialArea } from '../../radialCentroid/radialCentroidArea/radialCentroidArea'
import {
  QsRadialAxis,
  QsRadialAxisConfig,
} from '../../radialCentroid/radialCentroidAxis/qsTypes'
import { radialAxis } from '../../radialCentroid/radialCentroidAxis/radialCentroidAxis'
import {
  QsRadialLine,
  QsRadialLineConfig,
  QsRadialLineData,
} from '../../radialCentroid/radialCentroidLine/qsTypes'
import { radialLine } from '../../radialCentroid/radialCentroidLine/radialCentroidLine'
import {
  QsRadialPointData,
  QsRadialPoints,
  QsRadialPointsConfig,
} from '../../radialCentroid/radialCentroidPoints/qsTypes'
import { radialPoint } from '../../radialCentroid/radialCentroidPoints/radialCentroidPoints'
import {
  QsRadialSpokes,
  QsRadialSpokesConfig,
} from '../../radialCentroid/radialCentroidSpokes/qsTypes'
import { radialSpokes } from '../../radialCentroid/radialCentroidSpokes/radialCentroidSpokes'
import { Canvas } from './canvas'
import {
  QsUnboundText,
  QsUnboundTextConfig,
  QsUnboundTextData,
} from '../../unbound/text/qsTypes'
import { unboundText } from '../../unbound/text/text'
import {
  QsText,
  QsTextConfig,
  QsTextData,
} from '../../linear/linearText/qsTypes'
import {
  QsRadialText,
  QsRadialTextConfig,
  QsRadialTextData,
} from '../../radialCentroid/radialCentroidText/qsTypes'
import { radialText } from '../../radialCentroid/radialCentroidText/radialCentroidText'

interface HorizontalLinearAxisFunctions {
  bottom: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  top: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface HorizontalLinearElementFunctions {
  area: (data: QsAreaData, customConfig?: QsAreaConfig) => QsArea
  barGroup: (
    data: QsBarGroupedData,
    customConfig?: QsBarGroupConfig
  ) => QsBarGroups
  barStack: (
    data: QsBarStackedData,
    customConfig?: QsBarStackedConfig
  ) => QsBarStack
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  text: (data: QsTextData[], customConfig?: QsTextConfig) => QsText
  axis: HorizontalLinearAxisFunctions
}

interface VerticalLinearAxisFunctions {
  left: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  right: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface VerticalLinearElementFunctions {
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  text: (data: QsTextData[], customConfig?: QsTextConfig) => QsText
  axis: VerticalLinearAxisFunctions
}

interface LinearElementFunctions {
  horizontal: HorizontalLinearElementFunctions
  vertical: VerticalLinearElementFunctions
}

interface UnboundElementFunctions {
  legend: (data: QsLegendData[], customConfig?: QsLegendConfig) => {}
  text: (data: QsUnboundTextData[], customConfig?: QsUnboundTextConfig) => {}
}

interface PlottedElementFunctions {
  line: (data: QsPlottedLineData, customConfig?: QsPlottedLineConfig) => {}
  text: (data: QsPlottedTextData[], customConfig?: QsPlottedTextConfig) => {}
  points: (
    data: QsPlottedPointsData[],
    customConfig?: QsPlottedPointsConfig
  ) => {}
}

interface RadialArcTextElementFunctions {
  follow: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  horizontal: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  rotated: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
  spoke: (
    data: QsValuedText[],
    customConfig?: QsRadialArcTextConfig
  ) => QsRadialArcText
}

interface RadialArcElementFunctions {
  radial: (data: QsRadialData[], customConfig?: QsRadialArcConfig) => QsRadial
  text: RadialArcTextElementFunctions
}

interface RadialCentroidElementFunctions {
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
  text: (
    data: QsRadialTextData[],
    customConfig?: QsRadialTextConfig
  ) => QsRadialText
}

export interface QsGenerator {
  linear: LinearElementFunctions
  radialArc: RadialArcElementFunctions
  radialCentroid: RadialCentroidElementFunctions
  plotted: PlottedElementFunctions
  unbound: UnboundElementFunctions
}

export const getGenerators = (canvas: Canvas): QsGenerator => {
  const { elements } = canvas

  return {
    linear: {
      horizontal: {
        area: (data: QsAreaData, customConfig?: QsAreaConfig): QsArea => {
          const element = linearArea.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barGroup: (
          data: QsBarGroupedData,
          customConfig?: QsBarGroupConfig
        ): QsBarGroups => {
          const element = linearBarGroup.group(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barStack: (
          data: QsBarStackedData,
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
      line: (
        data: QsPlottedLineData,
        customConfig?: QsPlottedLineConfig
      ): QsLinePlot => {
        const element = plottedLine.line(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (
        data: QsPlottedTextData[],
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
    unbound: {
      legend: (
        data: QsLegendData[],
        customConfig?: QsLegendConfig
      ): QsLegend => {
        const element = legend(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
      text: (
        data: QsUnboundTextData[],
        customConfig?: QsUnboundTextConfig
      ): QsUnboundText => {
        const element = unboundText(canvas, data, customConfig)
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
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.follow(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        horizontal: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        rotated: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.rotated(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        spoke: (
          data: QsValuedText[],
          customConfig?: QsRadialArcTextConfig
        ): QsRadialArcText => {
          const element = radialArcText.spoke(canvas, data, customConfig)
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
      text: (
        data: QsRadialTextData[],
        customConfig?: QsRadialTextConfig
      ): QsRadialText => {
        const element = radialText.text(canvas, data, customConfig)
        elements.push({ element, data })
        return element
      },
    },
  }
}
