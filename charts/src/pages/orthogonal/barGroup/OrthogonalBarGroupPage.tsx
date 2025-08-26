import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { OrthogonalBarsGroupedDefaultsChart } from './OrthogonalBarsGroupedDefaultsChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  configAndData,
  configContent,
  defaultsContent,
  editorContent,
} from './Content'
import { OrthogonalBarsGroupedChart } from './OrthogonalBarsGroupedChart'

export default function OrthogonalBarGroupPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalBarsGroupedDefaultsChart
      canvasConfig={{
        chartName: 'barGroupDefaults',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
    <OrthogonalBarsGroupedChart
      canvasConfig={{
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
    defaultsContent,
    configContent,
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
        orthogonal Bar Group
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
