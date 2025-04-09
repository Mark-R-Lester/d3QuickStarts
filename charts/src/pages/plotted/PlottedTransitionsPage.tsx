import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'

export default function PlottedTransitionPage() {
  const elements: JSX.Element[] = [
    <LinearAreaElement
      canvasProps={{
        chartName: 'linearArea',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Transitions
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
