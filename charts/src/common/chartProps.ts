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
  QsValuedText,
  QsRadialPointData,
  QsPointData,
  QsPlottedTextData,
  QsPlottedTextConfig,
  QsCanvasConfigOrthogonal,
  QsCanvasConfigPlotted,
  QsBarStackedData,
  QsBarGroupedData,
} from 'd3qs/d3QuickStart'
import { EnumOrientation, EnumRadialTextOrientation } from './enums'
import {
  QsRadialTextConfig,
  QsRadialTextData,
} from 'd3qs/radialCentroid/radialCentroidText/qsTypes'

export interface ChartPropsOthogonal {
  canvasConfig: QsCanvasConfigOrthogonal
}

export interface OrienetedChartProps extends ChartPropsOthogonal {
  orientation: EnumOrientation
}

export interface RadialArcTextChartProps extends ChartPropsOthogonal {
  config?: QsRadialArcTextConfig
  data: QsValuedText[]
  orientation: EnumRadialTextOrientation
}

export interface AreaChartProps extends ChartPropsOthogonal {
  config?: QsAreaConfig
  data: QsAreaData
}

export interface AxisChartProps extends ChartPropsOthogonal {
  config?: QsAxisConfig
  data: string[]
}

export interface BarChartProps extends OrienetedChartProps {
  config?: QsBarConfig
  data: QsBarData[]
}

export interface BarGroupChartProps extends ChartPropsOthogonal {
  config?: QsBarGroupConfig
  data?: QsBarGroupedData[][]
}

export interface BarStackChartProps extends ChartPropsOthogonal {
  config?: QsBarStackedConfig
  data?: QsBarStackedData[][]
}

export interface LineChartProps extends ChartPropsOthogonal {
  config?: QsLineConfig
  data: number[]
}
export interface PointChartProps extends ChartPropsOthogonal {
  config?: QsPointsConfig
  data: QsPointData[]
  orientation: EnumOrientation
}
export interface RadialChartProps extends ChartPropsOthogonal {
  config?: QsRadialArcConfig
  data: QsRadialData[]
}
export interface RadialAreaChartProps extends ChartPropsOthogonal {
  config?: QsRadialAreaConfig
  data: QsRadialAreaData
}
export interface RadialAxisChartProps extends ChartPropsOthogonal {
  config?: QsRadialAxisConfig
  data: number[]
}
export interface RadialLineChartProps extends ChartPropsOthogonal {
  config?: QsRadialLineConfig
  data: number[]
}

export interface RadialPointsChartProps extends ChartPropsOthogonal {
  config?: QsRadialPointsConfig
  data: QsRadialPointData[]
}

export interface RadialTextChartProps extends ChartPropsOthogonal {
  config?: QsRadialTextConfig
  data: QsRadialTextData[]
}

export interface RadialSpokesChartProps extends ChartPropsOthogonal {
  config?: QsRadialSpokesConfig
  data: number
}

export interface ChartPropsPlotted {
  canvasConfig: QsCanvasConfigPlotted
}

export interface PlottedTextChartProps extends ChartPropsPlotted {
  config?: QsPlottedTextConfig
  data: QsPlottedTextData
}
