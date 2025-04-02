import { Box, Typography } from '@mui/material'
import { ChartButtonGrid } from '../../../components/atoms/ChartButtonGrid'

import { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentContainer } from '../../../components/atoms/ListContainer'
import {
  barCodeAsString,
  barDataAsString,
  simpleBarChartLarge,
  simpleBarChartLargeVertical,
  simpleBarChartSmall,
  simpleBarChartSmallVertical,
} from './SimpleBarChart'
import {
  floatingBarChartLarge,
  floatingBarChartLargeVertical,
  floatingBarChartSmall,
  floatingBarChartSmallVertical,
} from './SimpleFloatingBars'

export default function LinearBarsPage() {
  const menuElements: JSX.Element[] = [
    simpleBarChartSmall,
    simpleBarChartSmallVertical,
    floatingBarChartSmall,
    floatingBarChartSmallVertical,
  ]

  const charts: JSX.Element[] = [
    simpleBarChartLarge,
    simpleBarChartLargeVertical,
    floatingBarChartLarge,
    floatingBarChartLargeVertical,
  ]

  const [chart, setChart] = useState<JSX.Element>(charts[0])

  const content: JSX.Element[] = [
    <Typography variant="body1">Linear Bars are here to stay </Typography>,

    <SyntaxHighlighter language="typescript" style={atomOneDark}>
      {barCodeAsString}
    </SyntaxHighlighter>,

    <SyntaxHighlighter language="typescript" style={atomOneDark}>
      {barDataAsString}
    </SyntaxHighlighter>,

    <Box>{chart}</Box>,
  ]

  const onClick = (index: number) => {
    setChart(charts[index])
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
      <ContentContainer elements={content}></ContentContainer>
    </>
  )
}
