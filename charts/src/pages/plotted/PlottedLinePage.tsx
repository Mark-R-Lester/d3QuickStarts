import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedLineElement } from '../../components/atoms/chart/plotted/elements/PlottedLineElement'

export default function PlottedLinePage() {
  const elements: JSX.Element[] = [
    <PlottedLineElement chartName="plottedLine" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
