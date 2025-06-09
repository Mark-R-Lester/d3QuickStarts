import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { EnumOrientation } from '../../../common/enums'
import { LinearPointsDefaultsChart } from './LinearPointsDefaultsChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { LinearPointsChart } from './LinearPointsChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  linearPointsDefaultsContent,
  linearPointsContent,
  configAndData,
  editorContent,
} from './Content'

export default function LinearPointsPage() {
  const menuElements: JSX.Element[] = [
    <LinearPointsDefaultsChart
      canvasProps={{
        chartName: 'linearPointsDefaultsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearPointsChart
      canvasProps={{
        chartName: 'linearPointsChart',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    linearPointsDefaultsContent,
    linearPointsContent,
    configAndData,
    editorContent,
  ]
  const [content, setContent] = useState<JSX.Element>(contents[0])
  const onClick = (index: number) => {
    setContent(contents[index])
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
      <Box>{content}</Box>
    </>
  )
}
