import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { LinearBarsGroupedElement } from '../../components/atoms/chart/linear/LinearBarsGrouped'
import { useState } from 'react'

export default function LinearBarGroupPage() {
  const menuElements: JSX.Element[] = [
    <LinearBarsGroupedElement
      canvasProps={{
        chartName: 'linearBarsGroupedVertical',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 50,
      }}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearBarsGroupedElement
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
        Linear Bar Group
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
