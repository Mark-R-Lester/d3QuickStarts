import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialSpokesElement } from '../../components/atoms/chart/radial/elements/RadailSpokesElement'

export default function RadialCentroidSpokesPage() {
  const elements: JSX.Element[] = [
    <RadialSpokesElement
      canvasProps={{
        chartName: 'radialSpokes',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
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
