import { Box, Typography } from '@mui/material'

import { useState } from 'react'

import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'
import { LinearAreaElement } from './LinearArea'

export default function LinearAreaPage() {
  const menuElements: JSX.Element[] = [
    <LinearAreaElement
      canvasProps={{
        chartName: 'linearArea',
        width: 150,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearAreaElement
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
        Linear Area
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
