import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaTransition } from '../../components/atoms/chart/radial/transitions/RadialAreaTransition'
import { RadialLineTransition } from '../../components/atoms/chart/radial/transitions/RadialLineTransition'
import { RadialPointTransition } from '../../components/atoms/chart/radial/transitions/RadialPointsTransition'
import { RadialTextTransition } from '../../components/atoms/chart/radial/transitions/RadialTextTransition'

export default function RadialTransitionsPage() {
  const elements: JSX.Element[] = [
    <RadialAreaTransition targetId="radialAreaTransition" />,
    <RadialLineTransition targetId="radialLineTransition" />,
    <RadialPointTransition targetId="radialPointsTransition" />,
    <RadialTextTransition targetId="radialTextTransition" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Transitions
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
