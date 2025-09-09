import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { defaultsContent, configAndData, editorContent } from './Content'
import { RadialAxisChart } from './RadialAxisChart'
import { SingleWord } from '../../../components/atoms/chart/SingleWord'

export default function CentroidAxisPage() {
  const menuElements: JSX.Element[] = [
    <RadialAxisChart
      canvasConfig={{
        chartName: 'radialAxisChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 200,
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
        Radial Centroid axis
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
