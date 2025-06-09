import { Box, Typography } from '@mui/material'

import { useState } from 'react'
import { EnumOrientation } from '../../../common/enums'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  configAndData,
  editorContent,
  linearTextCustomisedContent,
  linearTextDefaultsContent,
} from './Content'
import { LinearTextChart } from './LinearTextChart'
import { LinearTextDefaultsChart } from './LinearTextDefaultsChart'

export default function LinearTextPage() {
  const menuElements: JSX.Element[] = [
    <LinearTextDefaultsChart
      canvasProps={{
        chartName: 'linearTextHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,

    <LinearTextChart
      canvasProps={{
        chartName: 'linearTextVertical',
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
    linearTextDefaultsContent,
    linearTextCustomisedContent,
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
