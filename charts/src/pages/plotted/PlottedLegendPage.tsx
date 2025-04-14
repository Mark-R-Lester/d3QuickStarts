import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { PlottedLegendElement } from '../../components/atoms/chart/plotted/PlottedLegend'
import { useState } from 'react'

export default function PlottedLegendPage() {
  const menuElements: JSX.Element[] = [
    <PlottedLegendElement
      canvasProps={{
        chartName: 'legendElement',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 250,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <PlottedLegendElement
      canvasProps={{
        chartName: 'charts',
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
        Plotted Legend
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
