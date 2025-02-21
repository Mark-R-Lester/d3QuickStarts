import { Typography } from '@mui/material'
import { LinearAreaElement } from '../../components/atoms/chart/linear/elements/LinearAreaElement'
import { ElementGrid } from '../../components/atoms/ElementGrid'

export default function LinearAreaPage() {
  const elements: JSX.Element[] = [<LinearAreaElement chartName="linearArea" />]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Area
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
