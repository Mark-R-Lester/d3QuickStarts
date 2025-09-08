import {
  QsAreaConfig,
  QsAreaData,
  QsAxisConfig,
  QsBarConfig,
  QsBarData,
  QsBarGroupConfig,
  QsBarStackedConfig,
  QsLineConfig,
  QsPointsConfig,
  QsRadialAreaConfig,
  QsRadialAreaData,
  QsRadialData,
  QsRadialAxisConfig,
  QsRadialArcConfig,
  QsRadialLineConfig,
  QsRadialPointsConfig,
  QsRadialSpokesConfig,
  QsRadialArcTextConfig,
  QsRadialTextData,
  QsRadialPointData,
  QsPointData,
  QsPlottedTextData,
  QsPlottedTextConfig,
  QsCanvasConfigOrthogonal,
  QsCanvasConfigPlotted,
  QsBarStackedData,
  QsBarGroupedData,
  QsLineData,
  QsCanvasConfigRadial,
  QsTextConfig,
  QsPlottedLineConfig,
  QsPlottedLineData,
  QsPlottedPointsConfig,
  QsPlottedPointsData,
  QsTextData,
  QsRadialLineData,
} from 'd3qs/d3QuickStart'
import { EnumOrientation, EnumRadialTextOrientation } from './enums'
import {
  QsRadialTextConfig,
  QsRadialCentroidTextData,
} from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

/**
 * Orthogonal interfaces
 */
export interface ChartPropsOthogonal {
  canvasConfig: QsCanvasConfigOrthogonal
}

export interface OrienetedChartProps extends ChartPropsOthogonal {
  orientation: EnumOrientation
}

export interface TextChartProps extends OrienetedChartProps {
  config?: QsTextConfig
  data?: QsTextData[]
}

export interface AreaChartProps extends ChartPropsOthogonal {
  config?: QsAreaConfig
  data?: QsAreaData
}

export interface AxisChartProps extends ChartPropsOthogonal {
  configH?: QsAxisConfig
  configV?: QsAxisConfig
}

export interface BarChartProps extends OrienetedChartProps {
  config?: QsBarConfig
  data?: QsBarData[]
}

export interface BarGroupChartProps extends ChartPropsOthogonal {
  config?: QsBarGroupConfig
  data?: QsBarGroupedData[][]
}

export interface BarStackChartProps extends ChartPropsOthogonal {
  config?: QsBarStackedConfig
  data?: QsBarStackedData[][]
}

export interface LineChartProps extends OrienetedChartProps {
  config?: QsLineConfig
  data?: QsLineData
}
export interface PointChartProps extends OrienetedChartProps {
  config?: QsPointsConfig
  data?: QsPointData[]
}

/**
 * Radial interfaces
 */
export interface ChartPropsRadial {
  canvasConfig: QsCanvasConfigRadial
}

export interface RadialArcTextChartProps extends ChartPropsRadial {
  config?: QsRadialArcTextConfig
  data?: QsRadialTextData[]
  orientation: EnumRadialTextOrientation
}
export interface RadialChartProps extends ChartPropsRadial {
  config?: QsRadialArcConfig
  data?: QsRadialData[]
}
export interface RadialAreaChartProps extends ChartPropsRadial {
  config?: QsRadialAreaConfig
  data1?: QsRadialAreaData
  data2?: QsRadialAreaData
}
export interface RadialAxisChartProps extends ChartPropsRadial {
  config?: QsRadialAxisConfig
}
export interface RadialLineChartProps extends ChartPropsRadial {
  config?: QsRadialLineConfig
  data?: QsRadialLineData
}

export interface RadialPointsChartProps extends ChartPropsRadial {
  config?: QsRadialPointsConfig
  data?: QsRadialPointData[]
}

export interface RadialTextChartProps extends ChartPropsRadial {
  config?: QsRadialTextConfig
  data?: QsRadialCentroidTextData[]
}

export interface RadialSpokesChartProps extends ChartPropsRadial {
  config?: QsRadialSpokesConfig
  data?: number
}

/**
 * Plotted interfaces
 */
export interface ChartPropsPlotted {
  canvasConfig: QsCanvasConfigPlotted
}

export interface PlottedTextChartProps extends ChartPropsPlotted {
  config?: QsPlottedTextConfig
  data?: QsPlottedTextData[]
}

export interface PlottedLineChartProps extends ChartPropsPlotted {
  config?: QsPlottedLineConfig
  data?: QsPlottedLineData
}

export interface PlottedPointsChartProps extends ChartPropsPlotted {
  config?: QsPlottedPointsConfig
  data?: QsPlottedPointsData[]
}
