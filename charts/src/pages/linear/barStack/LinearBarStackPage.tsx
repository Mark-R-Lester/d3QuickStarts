import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  configAndData,
  configContent,
  defaultsContent,
  editorContent,
} from './Content'
import { BarStackedDefaultsChart } from './BarStackedDefaultsChart'
import { BarStackedChart } from './BarStackedChart'

export default function LinearBarStackPage() {
  const menuElements: JSX.Element[] = [
    <BarStackedDefaultsChart
      canvasProps={{
        chartName: 'barStackedDefaultsButton',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 150,
      }}
    />,
    <BarStackedChart
      canvasProps={{
        chartName: 'barStackedButton',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 150,
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
        Linear Bar Stack
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
