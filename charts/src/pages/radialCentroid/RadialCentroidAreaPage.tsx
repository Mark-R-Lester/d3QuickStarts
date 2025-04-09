import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialAreaElement } from '../../components/atoms/chart/radial/elements/RadialAreaElement'

export default function RadialCentroidAreaPage() {
  const elements: JSX.Element[] = [
    <RadialAreaElement
      canvasProps={{
        chartName: 'radialArea',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 25,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Area
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
