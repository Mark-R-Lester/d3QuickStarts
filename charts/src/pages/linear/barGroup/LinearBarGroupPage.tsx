import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { LinearBarsGroupedDefaultsChart } from './LinearBarsGroupedDefaultsChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  barGroupContent,
  barGroupDefaultsContent,
  configAndData,
  editorContent,
} from './Content'
import { LinearBarsGroupedChart } from './LinearBarsGroupedChart'

export default function LinearBarGroupPage() {
  const menuElements: JSX.Element[] = [
    <LinearBarsGroupedDefaultsChart
      canvasProps={{
        chartName: 'barGroupDefaults',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <LinearBarsGroupedChart
      canvasProps={{
        chartName: 'barGroup',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    barGroupDefaultsContent,
    barGroupContent,
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
        Linear Bar Group
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
