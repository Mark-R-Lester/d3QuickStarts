import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialAreaElement } from '../../components/atoms/chart/radial/elements/RadialAreaElement'

export default function RadialElementsPage() {
  const elements: JSX.Element[] = [<RadialAreaElement chartName="radialArea" />]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Elements
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
