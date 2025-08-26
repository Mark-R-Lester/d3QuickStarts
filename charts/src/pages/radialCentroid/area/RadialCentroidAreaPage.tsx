import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'
import { RadialAreaDefaultsChart } from './RadialAreaDefaultsChart'
import { RadialAreaChart } from './RadialAreaChart'

export default function RadialCentroidAreaPage() {
  const menuElements: JSX.Element[] = [
    <RadialAreaDefaultsChart
      canvasConfig={{
        chartName: 'radialAreaDefaultsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 25,
      }}
    />,
    <RadialAreaChart
      canvasConfig={{
        chartName: 'radialAreaChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 25,
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
