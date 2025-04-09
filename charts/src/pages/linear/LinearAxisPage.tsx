import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { LinearAxisElement } from '../../components/atoms/chart/linear/elements/LinearAxisElement'
import { useState } from 'react'

export default function LinearAxisPage() {
  const menuElements: JSX.Element[] = [
    <LinearAxisElement
      canvasProps={{
        chartName: 'linearAxis',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 200,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearAxisElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 200,
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
        Linear Axis
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
