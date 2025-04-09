import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { PlottedTextElement } from '../../components/atoms/chart/plotted/elements/PlottedTextElement'

export default function PlottedTextPage() {
  const elements: JSX.Element[] = [
    <PlottedTextElement
      canvasProps={{
        chartName: 'textElement',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Text
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
