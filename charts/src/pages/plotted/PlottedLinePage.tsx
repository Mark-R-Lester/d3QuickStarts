import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedLineElement } from '../../components/atoms/chart/plotted/elements/PlottedLineElement'

export default function PlottedLinePage() {
  const elements: JSX.Element[] = [
    <PlottedLineElement chartName="plottedLine" chartWidth={150} />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Line
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
