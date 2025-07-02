import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { LinearAreaChart } from './LinearAreaChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import {
  configAndData,
  configContent,
  defaultsContent,
  editorContent,
} from './Content'
import { LinearAreaStackedChart } from './LinearAreaStackedChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'

export default function LinearAreaPage() {
  const menuElements: JSX.Element[] = [
    <LinearAreaChart
      canvasProps={{
        chartName: 'linearArea',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 190,
      }}
    />,
    <LinearAreaStackedChart
      canvasProps={{
        chartName: 'linearAreaStacked',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 190,
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
        Linear Area
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
