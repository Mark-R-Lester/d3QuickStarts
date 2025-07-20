import { legend } from '../../unbound/legend/legend'
import {
  QsLegend,
  QsLegendConfig,
  QsLegendData,
} from '../../unbound/legend/qsTypes'
import { orthogonalArea } from '../../orthogonal/orthogonalArea/area'
import {
  QsArea,
  QsAreaConfig,
  QsAreaData,
} from '../../orthogonal/orthogonalArea/qsTypes'
import { orthogonalAxis } from '../../orthogonal/orthogonalAxis/axis'
import { QsAxis, QsAxisConfig } from '../../orthogonal/orthogonalAxis/qsTypes'
import { orthogonalBar } from '../../orthogonal/orthogonalBar/bar'
import {
  QsBarConfig,
  QsBarData,
  QsBars,
} from '../../orthogonal/orthogonalBar/qsTypes'
import { orthogonalBarGroup } from '../../orthogonal/orthogonalBarGroup/barGroup'
import {
  QsBarGroupConfig,
  QsBarGroupedData,
  QsBarGroups,
} from '../../orthogonal/orthogonalBarGroup/qsTypes'
import { orthogonalBarStack } from '../../orthogonal/orthogonalBarStack/barStack'
import {
  QsBarStack,
  QsBarStackedConfig,
  QsBarStackedData,
} from '../../orthogonal/orthogonalBarStack/qsTypes'
import { orthogonalLine } from '../../orthogonal/orthogonalLine/line'
import {
  QsLine,
  QsLineConfig,
  QsLineData,
} from '../../orthogonal/orthogonalLine/qsTypes'
import { orthogonalPoint } from '../../orthogonal/orthogonalPoints/points'
import {
  QsPointData,
  QsPoints,
  QsPointsConfig,
} from '../../orthogonal/orthogonalPoints/qsTypes'
import { orthogonalText } from '../../orthogonal/orthogonalText/text'
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
} from '../../orthogonal/orthogonalText/qsTypes'
import {
  QsRadialText,
  QsRadialTextConfig,
  QsRadialTextData,
} from '../../radialCentroid/radialCentroidText/qsTypes'
import { radialText } from '../../radialCentroid/radialCentroidText/radialCentroidText'
import { Canvas } from '../types'

interface HorizontalorthogonalAxisFunctions {
  bottom: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  top: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface HorizontalorthogonalElementFunctions {
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
  axis: HorizontalorthogonalAxisFunctions
}

interface VerticalorthogonalAxisFunctions {
  left: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  right: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface VerticalorthogonalElementFunctions {
  bars: (data: QsBarData[], customConfig?: QsBarConfig) => QsBars
  line: (data: QsLineData, customConfig?: QsLineConfig) => QsLine
  points: (data: QsPointData[], customConfig?: QsPointsConfig) => QsPoints
  text: (data: QsTextData[], customConfig?: QsTextConfig) => QsText
  axis: VerticalorthogonalAxisFunctions
}

interface orthogonalElementFunctions {
  horizontal: HorizontalorthogonalElementFunctions
  vertical: VerticalorthogonalElementFunctions
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
  orthogonal: orthogonalElementFunctions
  radialArc: RadialArcElementFunctions
  radialCentroid: RadialCentroidElementFunctions
  plotted: PlottedElementFunctions
  unbound: UnboundElementFunctions
}

export const getGenerators = (canvas: Canvas): QsGenerator => {
  const { elements } = canvas

  return {
    orthogonal: {
      horizontal: {
        area: (data: QsAreaData, customConfig?: QsAreaConfig): QsArea => {
          const element = orthogonalArea.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barGroup: (
          data: QsBarGroupedData,
          customConfig?: QsBarGroupConfig
        ): QsBarGroups => {
          const element = orthogonalBarGroup.group(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        barStack: (
          data: QsBarStackedData,
          customConfig?: QsBarStackedConfig
        ): QsBarStack => {
          const element = orthogonalBarStack.stack(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = orthogonalBar.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = orthogonalLine.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = orthogonalPoint.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        text: (data: QsTextData[], customConfig?: QsTextConfig): QsText => {
          const element = orthogonalText.horizontal(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        axis: {
          bottom: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = orthogonalAxis.xAxisBottom(
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
            const element = orthogonalAxis.xAxisTop(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
        },
      },
      vertical: {
        bars: (data: QsBarData[], customConfig?: QsBarConfig): QsBars => {
          const element = orthogonalBar.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        line: (data: QsLineData, customConfig?: QsLineConfig): QsLine => {
          const element = orthogonalLine.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        points: (
          data: QsPointData[],
          customConfig?: QsPointsConfig
        ): QsPoints => {
          const element = orthogonalPoint.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        text: (data: QsTextData[], customConfig?: QsTextConfig): QsText => {
          const element = orthogonalText.vertical(canvas, data, customConfig)
          elements.push({ element, data })
          return element
        },
        axis: {
          left: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = orthogonalAxis.yAxisLeft(canvas, data, customConfig)
            elements.push({ element, data })
            return element
          },
          right: (
            data: number[] | string[],
            customConfig?: QsAxisConfig
          ): QsAxis => {
            const element = orthogonalAxis.yAxisRight(
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
