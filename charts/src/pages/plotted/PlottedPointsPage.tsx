import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedPointsElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsElement'
import { PlottedPointsEnhancedElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsEnhancedElement'

export default function PlottedPointsPage() {
  const elements: JSX.Element[] = [
    <PlottedPointsElement
      canvasProps={{
        chartName: 'plottedPoints',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
    <PlottedPointsEnhancedElement
      canvasProps={{
        chartName: 'PlottedPontsEnhanced',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
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
