import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsFloatingHorizontalTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingHorizontalTransition'
import { LinearBarsTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsTransition'
import { Orientation } from '../../common/enums'

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsTransition
      targetId="verticalBarTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsTransition
      targetId="horizontalBarTransition"
      orientation={Orientation.HORIZONTAL}
    />,

    <LinearBarsFloatingHorizontalTransition targetId="horizontalBarFloatingTransition" />,
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
