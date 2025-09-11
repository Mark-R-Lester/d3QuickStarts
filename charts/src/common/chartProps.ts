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
  QsCentroidAreaConfig,
  QsCentroidAreaData,
  QsArcData,
  QsCentroidAxisConfig,
  QsArcConfig,
  QsCentroidLineConfig,
  QsCentroidPointsConfig,
  QsCentroidSpokesConfig,
  QsArcTextConfig,
  QsArcTextData,
  QsCentroidPointData,
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
  QsCentroidLineData,
  QsArcPetalData,
  QsArcPetalConfig,
  QsArcSegmentConfig,
  QsArcSegmentData,
} from 'd3qs/d3QuickStart'
import { EnumOrientation, EnumRadialTextOrientation } from './enums'
import {
  QsCentroidTextConfig,
  QsCentroidTextData,
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
 * Centroid interfaces
 */
export interface ChartPropsRadial {
  canvasConfig: QsCanvasConfigRadial
}

export interface CentroidAreaChartProps extends ChartPropsRadial {
  config?: QsCentroidAreaConfig
  data1?: QsCentroidAreaData
  data2?: QsCentroidAreaData
}
export interface CentroidAxisChartProps extends ChartPropsRadial {
  config?: QsCentroidAxisConfig
}
export interface CentroidLineChartProps extends ChartPropsRadial {
  config?: QsCentroidLineConfig
  data?: QsCentroidLineData
}

export interface CentroidPointsChartProps extends ChartPropsRadial {
  config?: QsCentroidPointsConfig
  data?: QsCentroidPointData[]
}

export interface CentroidTextChartProps extends ChartPropsRadial {
  config?: QsCentroidTextConfig
  data?: QsCentroidTextData[]
}

export interface CentroidSpokesChartProps extends ChartPropsRadial {
  config?: QsCentroidSpokesConfig
  data?: number
}

/**
 * Arc interfaces
 */
export interface ArcTextChartProps extends ChartPropsRadial {
  config?: QsArcTextConfig
  data?: QsArcTextData[]
  orientation: EnumRadialTextOrientation
}

export interface ArcChartProps extends ChartPropsRadial {
  config?: QsArcConfig
  config2?: QsArcConfig
  data?: QsArcData[]
  data2?: QsArcData[]
}

export interface PetalChartProps extends ChartPropsRadial {
  config?: QsArcPetalConfig
  data?: QsArcPetalData[]
}

export interface SegmentChartProps extends ChartPropsRadial {
  config?: QsArcSegmentConfig
  data?: QsArcSegmentData[]
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
