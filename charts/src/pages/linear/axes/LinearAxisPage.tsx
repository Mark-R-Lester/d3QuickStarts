import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { LinearAxisChart } from './AxisConfigChart'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import {
  axiesDefaults,
  canvasWithVisibleDisplayArea,
  configAndData,
  editorContent,
} from './Content'
import { AxiesDefaultsChart } from './AxesDefaultsChart'

export default function LinearAxisPage() {
  const menuElements: JSX.Element[] = [
    <AxiesDefaultsChart
      canvasProps={{
        chartName: 'linearAxis',
        width: 130,
        highestViewableValue: 200,
      }}
    />,
    <LinearAxisChart
      canvasProps={{
        chartName: 'linearAxis2',
        width: 130,
        highestViewableValue: 200,
      }}
    />,

    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    axiesDefaults,
    canvasWithVisibleDisplayArea,
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
        Linear Axis
      </Typography>
      <ChartButtonGrid
        onClick={onClick}
        elements={menuElements}
      ></ChartButtonGrid>
      <Box>{content}</Box>
    </>
  )
}
