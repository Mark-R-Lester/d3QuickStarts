import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { RadialAreaElement } from '../../components/atoms/chart/radial/RadialArea'
import { useState } from 'react'

export default function RadialCentroidAreaPage() {
  const menuElements: JSX.Element[] = [
    <RadialAreaElement
      canvasProps={{
        chartName: 'radialArea',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 25,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <RadialAreaElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 25,
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
        Radial Centroid Area
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
