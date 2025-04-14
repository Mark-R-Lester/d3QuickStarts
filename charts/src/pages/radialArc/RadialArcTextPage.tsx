import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialTextFollowElement } from '../../components/atoms/chart/radial/RadialTextFollow'
import { RadialTextSpokeElement } from '../../components/atoms/chart/radial/RadialTextSpoke'
import { RadialTextHorizontalElement } from '../../components/atoms/chart/radial/RadialTextHorizontal'
import { RadialTextRotatedElement } from '../../components/atoms/chart/radial/RadialTextRotated'
import { useState } from 'react'

export default function RadialArcTextPage() {
  const menuElements: JSX.Element[] = [
    <RadialTextFollowElement
      canvasProps={{
        chartName: 'radialFollowText',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextSpokeElement
      canvasProps={{
        chartName: 'radialSpokeText',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextHorizontalElement
      canvasProps={{
        chartName: 'radialHorizontalText',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextRotatedElement
      canvasProps={{
        chartName: 'radialRotatedText',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialTextFollowElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextSpokeElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextHorizontalElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <RadialTextRotatedElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(charts[0])
  const onClick = (index: number) => {
    setChart(charts[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Arc Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
