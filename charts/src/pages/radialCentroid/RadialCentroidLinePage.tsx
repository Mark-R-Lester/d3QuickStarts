import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialLineElement } from '../../components/atoms/chart/radial/elements/RadialLineElement'

export default function RadialCentroidLinePage() {
  const elements: JSX.Element[] = [
    <RadialLineElement
      canvasProps={{
        chartName: 'radialLine',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 23,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Line
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
