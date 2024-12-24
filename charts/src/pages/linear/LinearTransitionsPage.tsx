import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsFloatingTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingTransition'
import { LinearBarsTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsTransition'
import { EnumOrientation } from '../../common/enums'
import { LinearLineTransition } from '../../components/atoms/chart/linear/transitions/LinearLineTransition'
import { LinearPointsTransition } from '../../components/atoms/chart/linear/transitions/LinearPointsTransition'
import { LinearAreaTransition } from '../../components/atoms/chart/linear/transitions/LinearAreaTransition'
import { LinearBarGroupTransition } from '../../components/atoms/chart/linear/transitions/LineaBarGroupTransition'

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsTransition
      chartName="verticalBarTransition"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearBarsFloatingTransition
      chartName="verticalBarFloatingTransition"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearLineTransition
      chartName="verticalLineTransition"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearPointsTransition
      chartName="verticalPointsTransition"
      orientation={EnumOrientation.VERTICAL}
    />,
    <LinearBarsTransition
      chartName="horizontalBarTransition"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearBarsFloatingTransition
      chartName="horizontalBarFloatingTransition"
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineTransition
      chartName="horizontalLineTransition"
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearPointsTransition
      chartName="horizontalPointsTransition"
      orientation={EnumOrientation.HORIZONTAL}
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
