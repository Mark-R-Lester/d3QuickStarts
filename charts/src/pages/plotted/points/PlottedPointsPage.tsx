import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { PlottedPointsElement } from './PlottedPoints'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { PlottedPointsEnhancedElement } from './PlottedPointsEnhanced'

export default function PlottedPointsPage() {
  const menuElements: JSX.Element[] = [
    <PlottedPointsElement
      canvasProps={{
        chartName: 'plottedPoints',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
    <PlottedPointsEnhancedElement
      canvasProps={{
        chartName: 'PlottedPontsEnhanced',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <PlottedPointsElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 156,
      }}
    />,
    <PlottedPointsEnhancedElement
      canvasProps={{
        chartName: 'chart',
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
        Plotted Points
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
