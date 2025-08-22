import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { OrthogonalAreaChart } from './OrthogonalAreaChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { configAndData, defaultsContent, editorContent } from './Content'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'

export default function OrthogonalAreaPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalAreaChart
      canvasProps={{
        chartName: 'orthogonalArea',
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
        orthogonal Area
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
