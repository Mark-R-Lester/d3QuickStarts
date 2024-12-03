import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsVerticalTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsVerticalTransition'
import { LinearBarsHorizontalTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsHorizontalTransition'
import { LinearBarsFloatingHorizontalTransition } from '../../components/atoms/chart/linear/transitions/LinearBarsFloatingHorizontalTransition'

export default function LinearTransitionsPage() {
  const elements: JSX.Element[] = [
    <LinearBarsVerticalTransition targetId="verticalBarTransition" />,
    <LinearBarsHorizontalTransition targetId="horizontalBarTransition" />,
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
