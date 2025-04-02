import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { PlottedLineElement } from '../../components/atoms/chart/plotted/elements/PlottedLineElement'

export default function PlottedLinePage() {
  const elements: JSX.Element[] = [
    <PlottedLineElement
      canvasProps={{
        chartName: 'plottedLine',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Line
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
