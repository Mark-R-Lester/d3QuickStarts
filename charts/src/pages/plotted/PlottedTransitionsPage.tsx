import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import { LinearAreaChart } from '../linear/area/LinearAreaChart'

export default function PlottedTransitionPage() {
  const menuElements: JSX.Element[] = [
    <LinearAreaChart
      canvasProps={{
        chartName: 'linearArea',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearAreaChart
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
        Plotted Transitions
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
