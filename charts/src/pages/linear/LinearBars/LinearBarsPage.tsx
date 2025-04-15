import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'
import { useState } from 'react'
import {
  verticalBarContent,
  horizontalBarContent,
  editorContent,
  configAndData,
} from './Content'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './SimpleBarChart'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    <SimpleBarChart
      canvasProps={{
        chartName: 'simpleBarChartHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <SimpleBarChart
      canvasProps={{
        chartName: 'simpleBarChartVertical',
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
    horizontalBarContent,
    verticalBarContent,
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
        Linear Bars
      </Typography>
      <ChartButtonGrid
        elements={menuElements}
        onClick={onClick}
      ></ChartButtonGrid>
      {content}
    </>
  )
}
