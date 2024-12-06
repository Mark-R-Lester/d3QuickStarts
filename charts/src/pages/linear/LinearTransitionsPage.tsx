import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsFloatingTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingTransition'
import { LinearBarsTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsTransition'
import { Orientation } from '../../common/enums'
import { LinearLineTransition } from '../../components/atoms/chart/linear/transitions/LinearLineTransition'

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsTransition
      targetId="verticalBarTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsFloatingTransition
      targetId="verticalBarFloatingTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearLineTransition
      targetId="verticalLineTransition"
      orientation={Orientation.VERTICAL}
    />,
    <LinearBarsTransition
      targetId="horizontalBarTransition"
      orientation={Orientation.HORIZONTAL}
    />,
    <LinearBarsFloatingTransition
      targetId="horizontalBarFloatingTransition"
      orientation={Orientation.HORIZONTAL}
    />,

    <LinearLineTransition
      targetId="horizontalLineTransition"
      orientation={Orientation.HORIZONTAL}
    />,
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
