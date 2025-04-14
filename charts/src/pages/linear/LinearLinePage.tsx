import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearLineElement } from '../../components/atoms/chart/linear/LinearLine'
import { useState } from 'react'

export default function LinearLinePage() {
  const menuElements: JSX.Element[] = [
    <LinearLineElement
      canvasProps={{
        chartName: 'linearLineHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineElement
      canvasProps={{
        chartName: 'linearLineVertical',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearLineElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const [chart, setChart] = useState<JSX.Element>(charts[0])
  const onClick = (index: number) => {
    setChart(charts[index])
  }

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Linear Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
