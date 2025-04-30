import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'
import { RadialAxisElement } from './RadialAxis'

export default function RadialCentroidAxisPage() {
  const menuElements: JSX.Element[] = [
    <RadialAxisElement
      canvasProps={{
        chartName: 'radialAxis',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialAxisElement
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
        Radial Centroid Axis
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
