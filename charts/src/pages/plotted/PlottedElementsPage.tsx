import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedPointsElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsElement'
import { PlottedPointsEnhancedElement } from '../../components/atoms/chart/plotted/elements/PlottedPointsEnhancedElement'
import { PlottedLineElement } from '../../components/atoms/chart/plotted/elements/PlottedLineElement'
import { PlottedTextElement } from '../../components/atoms/chart/plotted/elements/PlottedTextElement'
import { PlottedLegendElement } from '../../components/atoms/chart/plotted/elements/PlottedLegendElement'

export default function PlottedElementsPage() {
  const elements: JSX.Element[] = [
    <PlottedLineElement chartName="plottedLine" />,
    <PlottedPointsElement chartName="plottedPoints" />,
    <PlottedPointsEnhancedElement chartName="PlottedPontsEnhanced" />,
    <PlottedTextElement chartName="textElement" />,
    <PlottedLegendElement chartName="legendElement" />,
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
