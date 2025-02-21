import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialPointsElement } from '../../components/atoms/chart/radial/elements/RadialPointsElement'

export default function RadialCentroidPointsPage() {
  const elements: JSX.Element[] = [
    <RadialPointsElement chartName="radialPoints" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Points
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
