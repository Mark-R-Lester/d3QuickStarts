import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'

export default function LinearAxisPage() {
  const elements: JSX.Element[] = [
    <LinearAxisElement chartName="linearAxis" chartWidth={150} />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Axis
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
