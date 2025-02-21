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
  QsRadialConfig,
  QsRadialLineConfig,
  QsRadialPointsConfig,
  QsRadialSpokesConfig,
  QsRadialTextConfig,
  QsValuedText,
  QsRadialPointData,
  QsPointData,
} from 'd3qs/d3QuickStart'
import { EnumOrientation, EnumRadialTextOrientation } from './enums'

export interface ChartProps {
  chartName: string
  chartWidth: number
}

export interface RadialTextChartProps extends ChartProps {
  config?: QsRadialTextConfig
  data: QsValuedText[]
  orientation: EnumRadialTextOrientation
}

export interface AreaChartProps extends ChartProps {
  config?: QsAreaConfig
  data: QsAreaData
}

export interface AxisChartProps extends ChartProps {
  config?: QsAxisConfig
  data: string[]
}

export interface BarChartProps extends ChartProps {
  config?: QsBarConfig
  data: QsBarData[]
}

export interface BarGroupChartProps extends ChartProps {
  config?: QsBarGroupConfig
  data: number[][]
}

export interface BarStackChartProps extends ChartProps {
  config?: QsBarStackedConfig
  data: number[][]
}

export interface LineChartProps extends ChartProps {
  config?: QsLineConfig
  data: number[]
}
export interface PointChartProps extends ChartProps {
  config?: QsPointsConfig
  data: QsPointData[]
  orientation: EnumOrientation
}
export interface RadialChartProps extends ChartProps {
  config?: QsRadialConfig
  data: QsRadialData[]
}
export interface RadialAreaChartProps extends ChartProps {
  config?: QsRadialAreaConfig
  data: QsRadialAreaData
}
export interface RadialAxisChartProps extends ChartProps {
  config?: QsRadialAxisConfig
  data: number[]
}
export interface RadialLineChartProps extends ChartProps {
  config?: QsRadialLineConfig
  data: number[]
}

export interface RadialPointsChartProps extends ChartProps {
  config?: QsRadialPointsConfig
  data: QsRadialPointData[]
}

export interface RadialSpokesChartProps extends ChartProps {
  config?: QsRadialSpokesConfig
  data: number
}

export interface OrienetedChartProps extends ChartProps {
  orientation: EnumOrientation
}
