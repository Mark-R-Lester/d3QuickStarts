import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'
import { useState } from 'react'
import { verticalBarContent, horizontalBarContent } from './Content'
import { EnumOrientation } from '../../../common/enums'
import { LinearBarsElement } from './LinearBarsChart'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    <LinearBarsElement
      canvasProps={{
        chartName: 'simpleBarChartHorizontal',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.HORIZONTAL}
    />,
    <LinearBarsElement
      canvasProps={{
        chartName: 'simpleBarChartVertical',
        width: 130,
        lowestViewableValue: 0,
        highestViewableValue: 35,
      }}
      orientation={EnumOrientation.VERTICAL}
    />,
  ]

  const contents: JSX.Element[] = [horizontalBarContent, verticalBarContent]
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
