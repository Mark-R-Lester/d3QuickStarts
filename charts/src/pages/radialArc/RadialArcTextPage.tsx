import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialTextFollowElement } from '../../components/atoms/chart/radial/elements/RadialTextFollowElement'
import { RadialTextSpokeElement } from '../../components/atoms/chart/radial/elements/RadialTextSpokeElement'
import { RadialTextHorizontalElement } from '../../components/atoms/chart/radial/elements/RadialTextHorizontalElement'
import { RadialTextRotatedElement } from '../../components/atoms/chart/radial/elements/RadialTextRotatedElement'

export default function RadialArcTextPage() {
  const elements: JSX.Element[] = [
    <RadialTextFollowElement
      canvasProps={{
        chartName: 'radialFollowText',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextSpokeElement
      canvasProps={{
        chartName: 'radialSpokeText',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextHorizontalElement
      canvasProps={{
        chartName: 'radialHorizontalText',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextRotatedElement
      canvasProps={{
        chartName: 'radialRotatedText',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Arc Text
      </Typography>
      {/* <ChartButtonGrid elements={elements}></ChartButtonGrid> */}
    </>
  )
}
