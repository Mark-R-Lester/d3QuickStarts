import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { PlottedTextElement } from '../../components/atoms/chart/plotted/elements/PlottedTextElement'

export default function PlottedTextPage() {
  const elements: JSX.Element[] = [
    <PlottedTextElement chartName="textElement" />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Text
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
