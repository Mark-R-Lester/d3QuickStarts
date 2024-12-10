import { Orientation } from './enums'

export interface ChartProps {
  chartName: string
}

export interface OrienetedChartProps extends ChartProps {
  orientation: Orientation
}
