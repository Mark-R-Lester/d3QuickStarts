import { Orientation, Grouping } from '../../../common/enums'

export interface ChartProps {
  targetId: string
}

export interface OrienetedChartProps extends ChartProps {
  orientation: Orientation
}

export interface GroupedChartProps extends ChartProps {
  grouping: Grouping
}
