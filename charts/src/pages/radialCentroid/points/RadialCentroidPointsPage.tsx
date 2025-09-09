import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'
import { RadialPointsChart } from './RadialPointsChart'
import { RadialPointsDefaultsChart } from './RadialPointsDefaultsChart'

export default function CentroidPointsPage() {
  const menuElements: JSX.Element[] = [
    <RadialPointsDefaultsChart
      canvasConfig={{
        chartName: 'radialPointDefaultsCharts',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 2,
      }}
    />,
    <RadialPointsChart
      canvasConfig={{
        chartName: 'radialPointsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 2,
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
