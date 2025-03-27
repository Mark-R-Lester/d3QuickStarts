import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAxisElement } from '../../components/atoms/chart/radial/elements/RadialAxisElement'

export default function RadialCentroidAxisPage() {
  const elements: JSX.Element[] = [
    <RadialAxisElement
      canvasProps={{
        chartName: 'radialAxis',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Axis
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
