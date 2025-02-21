import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialSpokesElement } from '../../components/atoms/chart/radial/elements/RadailSpokesElement'

export default function RadialCentroidSpokesPage() {
  const elements: JSX.Element[] = [
    <RadialSpokesElement chartName="radialSpokes" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Spokes
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
