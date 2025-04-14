import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialLineElement } from '../../components/atoms/chart/radial/RadialLine'
import { useState } from 'react'

export default function RadialCentroidLinePage() {
  const menuElements: JSX.Element[] = [
    <RadialLineElement
      canvasProps={{
        chartName: 'radialLine',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 23,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialLineElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 23,
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
        Radial Centroid Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
