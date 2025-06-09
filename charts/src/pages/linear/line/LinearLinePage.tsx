import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { EnumOrientation } from '../../../common/enums'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { LinearLineDefaultsChart } from './LinearLineDefaultsChart'
import { LinearLineChart } from './LinearLineChart'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  lineDefaultsContent,
  lineContent,
  configAndData,
  editorContent,
} from './Content'

export default function LinearLinePage() {
  const menuElements: JSX.Element[] = [
    <LinearLineDefaultsChart
      canvasProps={{
        chartName: 'linearLineHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearLineChart
      canvasProps={{
        chartName: 'linearLineVertical',
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
    lineDefaultsContent,
    lineContent,
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
        Linear Line
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
