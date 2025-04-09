import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialPieElement } from '../../components/atoms/chart/radial/elements/RadialPieElement'
import { RadialDoughnutElement } from '../../components/atoms/chart/radial/elements/RadialDoughnutElement'

export default function RadialArcPage() {
  const elements: JSX.Element[] = [
    <RadialDoughnutElement
      canvasProps={{
        chartName: 'radialDoughnut',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 60,
      }}
    />,
    <RadialPieElement
      canvasProps={{
        chartName: 'radialPie',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Arc
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
