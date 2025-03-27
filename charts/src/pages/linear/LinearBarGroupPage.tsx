import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarsGroupedElement } from '../../components/atoms/chart/linear/elements/LinearBarsGroupedElement'

export default function LinearBarGroupPage() {
  const elements: JSX.Element[] = [
    <LinearBarsGroupedElement
      canvasProps={{
        chartName: 'linearBarsGroupedVertical',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bar Group
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
