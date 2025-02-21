import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialLineElement } from '../../components/atoms/chart/radial/elements/RadialLineElement'

export default function RadialElementsPage() {
  const elements: JSX.Element[] = [<RadialLineElement chartName="radialLine" />]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
