import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import {
  defaultsContent,
  configContent,
  editorContent,
  configAndData,
} from './Content'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './OrthogonalBarChart'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'

export default function OrthogonalBarsPage() {
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
    defaultsContent,
    configContent,
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
        orthogonal Bars
      </Typography>
      <ChartButtonGrid
        elements={menuElements}
        onClick={onClick}
      ></ChartButtonGrid>
      {content}
    </>
  )
}
