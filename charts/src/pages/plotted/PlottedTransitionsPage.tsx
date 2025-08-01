import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import { OrthogonalAreaChart } from '../orthogonal/area/OrthogonalAreaChart'

export default function PlottedTransitionPage() {
  const menuElements: JSX.Element[] = [
    <OrthogonalAreaChart
      canvasProps={{
        chartName: 'orthogonalArea',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <OrthogonalAreaChart
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
