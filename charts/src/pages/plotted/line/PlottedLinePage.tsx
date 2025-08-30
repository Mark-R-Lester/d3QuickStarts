import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { PlottedLineChart } from './PlottedLineChart'
import { defaultsContent, configAndData, editorContent } from './Content'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'

export default function PlottedLinePage() {
  const menuElements: JSX.Element[] = [
    <PlottedLineChart
      canvasConfig={{
        chartName: 'plottedLineChart',
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
        Plotted Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
