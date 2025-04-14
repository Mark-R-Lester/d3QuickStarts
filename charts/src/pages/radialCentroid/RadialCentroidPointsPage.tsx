import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialPointsElement } from '../../components/atoms/chart/radial/RadialPoints'
import { useState } from 'react'

export default function RadialCentroidPointsPage() {
  const menuElements: JSX.Element[] = [
    <RadialPointsElement
      canvasProps={{
        chartName: 'radialPoints',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialPointsElement
      canvasProps={{
        chartName: 'charts',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 50,
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
        Radial Centroid Points
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
