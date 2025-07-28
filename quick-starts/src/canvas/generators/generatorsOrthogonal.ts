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
import { Canvas } from '../types'

interface HorizontalorthogonalAxisFunctions {
  bottom: (customConfig?: QsAxisConfig) => QsAxis
  top: (customConfig?: QsAxisConfig) => QsAxis
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
  left: (customConfig?: QsAxisConfig) => QsAxis
  right: (customConfig?: QsAxisConfig) => QsAxis
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

export interface QsGeneratorOrthogonal {
  orthogonal: orthogonalElementFunctions
  unbound: UnboundElementFunctions
}

export const getGenerators = (canvas: Canvas): QsGeneratorOrthogonal => {
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
          bottom: (customConfig?: QsAxisConfig): QsAxis => {
            const element = orthogonalAxis.xAxisBottom(canvas, customConfig)
            elements.push({
              element,
              data: undefined,
            })
            return element
          },
          top: (customConfig?: QsAxisConfig): QsAxis => {
            const element = orthogonalAxis.xAxisTop(canvas, customConfig)
            elements.push({ element, data: undefined })
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
          left: (customConfig?: QsAxisConfig): QsAxis => {
            const element = orthogonalAxis.yAxisLeft(canvas, customConfig)
            elements.push({ element, data: undefined })
            return element
          },
          right: (customConfig?: QsAxisConfig): QsAxis => {
            const element = orthogonalAxis.yAxisRight(canvas, customConfig)
            elements.push({ element, data: undefined })
            return element
          },
        },
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
  }
}
