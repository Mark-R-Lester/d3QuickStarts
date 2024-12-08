import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaTransition } from '../../components/atoms/chart/radial/transitions/RadialAreaTransition'

export default function RadialTransitionsPage() {
  const elements: JSX.Element[] = [
    <RadialAreaTransition targetId="radialAreaTransition" />,
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
