import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'

export default function LinearAxisPage() {
  const elements: JSX.Element[] = [
    <LinearAxisElement
      canvasProps={{
        chartName: 'linearAxis',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 200,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Axis
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
