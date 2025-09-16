import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { defaultsContent, configAndData, editorContent } from './Content'
import { RadialTextChart } from './TextChart'

export default function CentroidPointsPage() {
  const menuElements: JSX.Element[] = [
    <RadialTextChart
      canvasConfig={{
        chartName: 'radialPointsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 10,
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
        Centroid Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
