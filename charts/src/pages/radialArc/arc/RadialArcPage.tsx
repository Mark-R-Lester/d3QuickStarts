import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { defaultsContent, configAndData, editorContent } from './Content'
import { RadialConfigChart } from './RadialConfigChart'

import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'

export default function RadialArcPage() {
  const menuElements: JSX.Element[] = [
    <RadialConfigChart
      canvasConfig={{
        chartName: 'radialPie',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <ConfigAndData />,
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
        Radial
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
