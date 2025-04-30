import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { PlottedLineElement } from './PlottedLine'

export default function PlottedLinePage() {
  const menuElements: JSX.Element[] = [
    <PlottedLineElement
      canvasProps={{
        chartName: 'plottedLine',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
  ]
  const charts: JSX.Element[] = [
    <PlottedLineElement
      canvasProps={{
        chartName: 'charts',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 156,
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
        Plotted Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
