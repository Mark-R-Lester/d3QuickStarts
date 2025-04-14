import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../components/atoms/ChartButtonGrid'
import { EnumOrientation } from '../../common/enums'
import { LinearTextElement } from '../../components/atoms/chart/linear/LinearText'
import { useState } from 'react'

export default function LinearTextPage() {
  const menuElements: JSX.Element[] = [
    <LinearTextElement
      canvasProps={{
        chartName: 'linearTextHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearTextElement
      canvasProps={{
        chartName: 'linearTextVertical',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const charts: JSX.Element[] = [
    <LinearTextElement
      canvasProps={{
        chartName: 'chart',
        width: 800,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearTextElement
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
        Linear Text
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{chart}</Box>
    </>
  )
}
