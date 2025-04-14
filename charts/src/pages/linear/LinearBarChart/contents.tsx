import { Box, Typography } from '@mui/material'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentContainer } from '../../../components/atoms/ListContainer'
import {
  barsVerticalAsString,
  barsHorizontalAsString,
  barDataAsString,
  simpleBarChartHorizontal,
  simpleBarChartVertical,
} from './SimpleBarChart'

import { ChartEditor } from './ChartEditor'

export const horizontalBarContent: JSX.Element = (
  <ContentContainer
    elements={[
      <Typography variant="body1">
        The simplest bar chart can be created in just four lines of code,
        excluding data.
      </Typography>,
      <SyntaxHighlighter language="typescript" style={atomOneDark}>
        {barsHorizontalAsString}
      </SyntaxHighlighter>,
      <Typography variant="body1">
        Bars use the type QsBarData the only mandatory field is upperBoundry
      </Typography>,
      <SyntaxHighlighter language="typescript" style={atomOneDark}>
        {barDataAsString}
      </SyntaxHighlighter>,
      <Box>{simpleBarChartHorizontal('chartH', 800)}</Box>,
    ]}
  ></ContentContainer>
)

export const verticalBarContent: JSX.Element = (
  <ContentContainer
    elements={[
      <Typography variant="body1">
        The simplest bar chart can be created in just four lines of code,
        excluding data.
      </Typography>,
      <SyntaxHighlighter language="typescript" style={atomOneDark}>
        {barsVerticalAsString}
      </SyntaxHighlighter>,
      <Typography variant="body1">
        Bars use the type QsBarData the only mandatory field is upperBoundry
      </Typography>,
      <SyntaxHighlighter language="typescript" style={atomOneDark}>
        {barDataAsString}
      </SyntaxHighlighter>,
      <Box>{simpleBarChartVertical('chartV', 800)}</Box>,
    ]}
  ></ContentContainer>
)

export const editorContent: JSX.Element = (
  <ChartEditor
    initialCode={`
  const data: QsBarData[] = [
    { upperBoundry: 25, lowerBoundry: 5},
    { upperBoundry: 5 },
    { upperBoundry: 35 },
    { upperBoundry: 25 },
    { upperBoundry: 35 },
    { upperBoundry: 5 },
    { upperBoundry: 25 },
    { upperBoundry: 25 },
  ]
  const canvasProps = {
    chartName: 'ChartEditable',
    width: 800,
    lowestViewableValue: 0,
    highestViewableValue: 35,
  }
  const canvas: QsCanvas = qsCreateCanvas(canvasProps)
  canvas.generate.linear.vertical.bars(data)
`}
  ></ChartEditor>
)
