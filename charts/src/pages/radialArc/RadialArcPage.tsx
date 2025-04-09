import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialPieElement } from '../../components/atoms/chart/radial/elements/RadialPieElement'
import { RadialDoughnutElement } from '../../components/atoms/chart/radial/elements/RadialDoughnutElement'
import { useState } from 'react'

export default function RadialArcPage() {
  const menuElements: JSX.Element[] = [
    <RadialDoughnutElement
      canvasProps={{
        chartName: 'radialDoughnut',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 60,
      }}
    />,
    <RadialPieElement
      canvasProps={{
        chartName: 'radialPie',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialDoughnutElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 60,
      }}
    />,
    <RadialPieElement
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
        Radial Arc
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
