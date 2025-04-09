import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { PlottedLegendElement } from '../../components/atoms/chart/plotted/elements/PlottedLegendElement'

export default function PlottedLegendPage() {
  const elements: JSX.Element[] = [
    <PlottedLegendElement
      canvasProps={{
        chartName: 'legendElement',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Legend
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
