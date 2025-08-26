import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { UnboundLegendDefaultsChart } from './UnboundLegendDefaultsChart'
import { UnboundLegendChart } from './UnboundLegendChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  configAndData,
  editorContent,
  defaultsContent,
  configContent,
} from './Content'

export default function UnboundLegendPage() {
  const menuElements: JSX.Element[] = [
    <UnboundLegendDefaultsChart
      canvasConfig={{
        chartName: 'legendElement',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
    <UnboundLegendChart
      canvasConfig={{
        chartName: 'charts',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
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
        Unbound Legend
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
