import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
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
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
