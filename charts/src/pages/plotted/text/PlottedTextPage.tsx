import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { PlottedTextElement } from './PlottedText'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'

export default function PlottedTextPage() {
  const menuElements: JSX.Element[] = [
    <PlottedTextElement
      canvasProps={{
        chartName: 'textElement',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <PlottedTextElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(charts[0])
  const onClick = (index: number) => {
    setChart(charts[index])
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
      <Box>{chart}</Box>
    </>
  )
}
