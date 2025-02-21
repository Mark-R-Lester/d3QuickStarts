import { Typography } from '@mui/material'
import { ElementGrid } from '../../components/atoms/ElementGrid'
import { RadialTextFollowElement } from '../../components/atoms/chart/radial/elements/RadialTextFollowElement'
import { RadialTextSpokeElement } from '../../components/atoms/chart/radial/elements/RadialTextSpokeElement'
import { RadialTextHorizontalElement } from '../../components/atoms/chart/radial/elements/RadialTextHorizontalElement'
import { RadialTextRotatedElement } from '../../components/atoms/chart/radial/elements/RadialTextRotatedElement'

export default function RadialArcTextPage() {
  const elements: JSX.Element[] = [
    <RadialTextFollowElement chartName="radialFollowText" chartWidth={150} />,
    <RadialTextSpokeElement chartName="radialSpokeText" chartWidth={150} />,
    <RadialTextHorizontalElement
      chartName="radialHorizontalText"
      chartWidth={150}
    />,
    <RadialTextRotatedElement chartName="radialRotatedText" chartWidth={150} />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Arc Text
      </Typography>
      <ElementGrid elements={elements}></ElementGrid>
    </>
  )
}
