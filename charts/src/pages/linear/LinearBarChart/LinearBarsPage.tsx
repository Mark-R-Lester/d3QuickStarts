import { Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'
import { useState } from 'react'
import {
  simpleBarChartHorizontal,
  simpleBarChartVertical,
} from './SimpleBarChart'

import { verticalBarContent, horizontalBarContent } from './contents'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    simpleBarChartHorizontal('simpleBarChartHorizontal', 130),
    simpleBarChartVertical('simpleBarChartVertical', 130),
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
