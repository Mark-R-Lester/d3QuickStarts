import { legend } from '../../unbound/legend/legend'
import {
  QsLegend,
  QsLegendConfig,
  QsLegendData,
} from '../../unbound/legend/qsTypes'
import { orthogonalAxis } from '../../orthogonal/orthogonalAxis/axis'
import { QsAxis, QsAxisConfig } from '../../orthogonal/orthogonalAxis/qsTypes'
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
  QsUnboundText,
  QsUnboundTextConfig,
  QsUnboundTextData,
} from '../../unbound/text/qsTypes'
import { unboundText } from '../../unbound/text/text'
import { Canvas } from '../types'

interface HorizontalorthogonalAxisFunctions {
  bottom: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  top: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface HorizontalorthogonalElementFunctions {
  axis: HorizontalorthogonalAxisFunctions
}

interface VerticalorthogonalAxisFunctions {
  left: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
  right: (data: number[] | string[], customConfig?: QsAxisConfig) => QsAxis
}

interface VerticalorthogonalElementFunctions {
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

export interface QsGeneratorPlotted {
  orthogonal: orthogonalElementFunctions
  plotted: PlottedElementFunctions
  unbound: UnboundElementFunctions
}

export const getGenerators = (canvas: Canvas): QsGeneratorPlotted => {
  const { elements } = canvas

  return {
    orthogonal: {
      horizontal: {
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
  }
}
