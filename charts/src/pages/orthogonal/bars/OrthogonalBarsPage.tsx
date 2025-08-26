import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/molecules/ChartButtonGrid'
import { useState } from 'react'
import { defaultsContent, editorContent, configAndData } from './Content'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './OrthogonalBarChart'
import { TryItYourSelf } from '../../../components/atoms/chart/TryItYourSelf'
import { ConfigAndData } from '../../../components/atoms/chart/ConfigAndData'

export default function OrthogonalBarsPage() {
  const menuElements: JSX.Element[] = [
    <SimpleBarChart
      canvasConfig={{
        chartName: 'simpleBarChartHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <ConfigAndData />,
    <TryItYourSelf />,
  ]

  const contents: JSX.Element[] = [
    defaultsContent,
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
        Orthogonal Bars
      </Typography>
      <ChartButtonGrid
        elements={menuElements}
        onClick={onClick}
      ></ChartButtonGrid>
      {content}
    </>
  )
}
