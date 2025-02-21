import { Typography } from '@mui/material'

import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearBarStacksElement } from '../../components/atoms/chart/linear/elements/LinearBarStacksElement'

export default function LinearBarStackPage() {
  const elements: JSX.Element[] = [
    <LinearBarStacksElement
      chartName="linearBarsStackedVertical"
      chartWidth={150}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Bar Stack
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
