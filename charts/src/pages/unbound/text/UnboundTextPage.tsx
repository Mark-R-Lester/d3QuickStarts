import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { UnboundTextChart } from './UnboundTextChart'
import { UnboundTextDefaultsChart } from './UnboundTextDefaultsChart'
import {
  defaultsContent,
  configContent,
  configAndData,
  editorContent,
} from './Content'

export default function UnboundTextPage() {
  const menuElements: JSX.Element[] = [
    <UnboundTextDefaultsChart
      canvasConfig={{
        chartName: 'unboundTextDefaultsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
      }}
    />,
    <UnboundTextChart
      canvasConfig={{
        chartName: 'unboundTextChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 100,
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
        Unbound Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
