import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialSpokesElement } from '../../components/atoms/chart/radial/elements/RadailSpokesElement'
import { useState } from 'react'

export default function RadialCentroidSpokesPage() {
  const menuElements: JSX.Element[] = [
    <RadialSpokesElement
      canvasProps={{
        chartName: 'radialSpokes',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialSpokesElement
      canvasProps={{
        chartName: 'chart',
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
        Radial Centroid Spokes
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
