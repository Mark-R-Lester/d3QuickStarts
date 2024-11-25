import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'

export default function LinearChartsPage() {
  const elements: JSX.Element[] = [<LinearAreaElement targetId="linearArea" />]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Plotted Charts
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
