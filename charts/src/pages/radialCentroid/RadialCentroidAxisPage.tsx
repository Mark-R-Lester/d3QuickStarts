import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAxisElement } from '../../components/atoms/chart/radial/elements/RadialAxisElement'

export default function RadialElementsPage() {
  const elements: JSX.Element[] = [<RadialAxisElement chartName="radialAxis" />]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
