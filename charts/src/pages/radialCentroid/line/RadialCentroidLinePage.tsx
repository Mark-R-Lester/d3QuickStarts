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
import { RadialLineDefaultsChart } from './RadialLineDefaultsChart'
import { RadialLineChart } from './RadialLineChart'

export default function RadialCentroidLinePage() {
  const menuElements: JSX.Element[] = [
    <RadialLineDefaultsChart
      canvasProps={{
        chartName: 'radialLineDefaultsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 23,
      }}
    />,
    <RadialLineChart
      canvasProps={{
        chartName: 'radialLineChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 23,
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
