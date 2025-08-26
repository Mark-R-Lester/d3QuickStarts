import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { PlottedTextChart } from './PlottedTextChart'
import { PlottedTextDefaultsChart } from './PlottedTextDefaultsChart'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'

export default function PlottedTextPage() {
  const menuElements: JSX.Element[] = [
    <PlottedTextDefaultsChart
      canvasConfig={{
        chartName: 'plottedTextDefaultsChart',
        width: 130,
        highestViewableValueX: 156,
        highestViewableValueY: 100,
      }}
    />,
    <PlottedTextChart
      canvasConfig={{
        chartName: 'plottedTextChart',
        width: 130,
        highestViewableValueX: 156,
        highestViewableValueY: 100,
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
        Plotted Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
