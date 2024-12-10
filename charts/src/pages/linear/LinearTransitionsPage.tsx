import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsFloatingTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingTransition'
import { LinearBarsTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsTransition'
import { Orientation } from '../../common/enums'
import { LinearLineTransition } from '../../components/atoms/chart/linear/transitions/LinearLineTransition'
import { LinearPointsTransition } from '../../components/atoms/chart/linear/transitions/LinearPointsTransition'
import { LinearAreaTransition } from '../../components/atoms/chart/linear/transitions/LinearAreaTransition'
import { LinearBarGroupTransition } from '../../components/atoms/chart/linear/transitions/LineaBarGroupTransition'

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsTransition
      chartName="verticalBarTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsFloatingTransition
      chartName="verticalBarFloatingTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearLineTransition
      chartName="verticalLineTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearPointsTransition
      chartName="verticalPointsTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsTransition
      chartName="horizontalBarTransition"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearBarsFloatingTransition
      chartName="horizontalBarFloatingTransition"
      orientation={Orientation.HORIZONTAL}
    />,

    <LinearLineTransition
      chartName="horizontalLineTransition"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      chartName="horizontalPointsTransition"
      orientation={Orientation.HORIZONTAL}
    />,

    <LinearAreaTransition chartName="AreaTransition" />,
    <LinearBarGroupTransition chartName="BarGroupTransition" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Transitions
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
