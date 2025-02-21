import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedPointsElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsElement'
import { PlottedPointsEnhancedElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsEnhancedElement'

export default function PlottedPointsPage() {
  const elements: JSX.Element[] = [
    <PlottedPointsElement chartName="plottedPoints" chartWidth={150} />,
    <PlottedPointsEnhancedElement
      chartName="PlottedPontsEnhanced"
      chartWidth={150}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Points
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
