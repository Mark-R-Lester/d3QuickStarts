import { Box, Typography } from '@mui/material'

import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearPointsElement } from '../../components/atoms/chart/linear/elements/LinearPointsElement'
import { useState } from 'react'

export default function LinearPointsPage() {
  const menuElements: JSX.Element[] = [
    <LinearPointsElement
      canvasProps={{
        chartName: 'linearPointsHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearPointsElement
      canvasProps={{
        chartName: 'linearPointsVertical',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearPointsElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearPointsElement
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
        Linear Points
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
