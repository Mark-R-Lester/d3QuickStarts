import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaElement } from '../../components/atoms/chart/radial/elements/RadialAreaElement'

export default function RadialCentroidAreaPage() {
  const elements: JSX.Element[] = [
    <RadialAreaElement chartName="radialArea" chartWidth={150} />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Area
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
