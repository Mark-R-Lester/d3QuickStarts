import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { defaultsContent, configAndData, editorContent } from './Content'
import { RadialSpokesChart } from './RadailSpokesChart'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'

export default function RadialCentroidSpokesPage() {
  const menuElements: JSX.Element[] = [
    <RadialSpokesChart
      canvasConfig={{
        chartName: 'radialSpokesChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 180,
      }}
    />,
    <SingleWord text="Config" chartName="config" />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    defaultsContent,
    configAndData,
    editorContent,
  ]
  const [content, setContent] = useState<JSX.Element>(contents[0])
  const onClick = (index: number) => {
    setContent(contents[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Radial Centroid Spokes
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
