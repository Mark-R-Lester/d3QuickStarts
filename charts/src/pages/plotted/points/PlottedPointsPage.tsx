import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'
import { PlottedPointsDefaultsChart } from './PlottedPointsDefaultsChart'
import { PlottedPointsChart } from './PlottedPointsChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'

export default function PlottedPointsPage() {
  const menuElements: JSX.Element[] = [
    <PlottedPointsDefaultsChart
      canvasConfig={{
        chartName: 'plottedPointsDefaultsChart',
        width: 130,
        highestViewableValueX: 156,
        highestViewableValueY: 156,
      }}
    />,
    <PlottedPointsChart
      canvasConfig={{
        chartName: 'PlottedPointsChart',
        width: 130,
        highestViewableValueX: 156,
        highestViewableValueY: 156,
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
        Plotted Points
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
