import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedLegendElement } from '../../components/atoms/chart/plotted/elements/PlottedLegendElement'

export default function PlottedLegendPage() {
  const elements: JSX.Element[] = [
    <PlottedLegendElement chartName="legendElement" chartWidth={150} />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Legend
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
