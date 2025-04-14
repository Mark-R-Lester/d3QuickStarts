import { Box, Typography } from '@mui/material'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentContainer } from '../../../components/atoms/ListContainer'
import { ChartEditor } from './ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { LinearBarsElement } from './LinearBarsChart'

export const barDataAsString: string = `const barDataSimple: QsBarData[] =[
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]`

export const barsVerticalAsString: string = `const canvas: QsCanvas = qsCreateCanvas(canvasProps)
  canvas.generate.linear.vertical.bars(data, config)
  canvas.generate.linear.horizontal.axis.bottom([0, 35])
  canvas.generate.linear.vertical.axis.leftBanded([
    1, 2, 3, 4, 5, 6, 7, 8,
  ])`

export const barsHorizontalAsString: string = `const canvas: QsCanvas = qsCreateCanvas(canvasProps)
  canvas.generate.linear.horizontal.bars(data, config)
  canvas.generate.linear.vertical.axis.left([0, 35])
  canvas.generate.linear.horizontal.axis.bottomBanded([
    1, 2, 3, 4, 5, 6, 7, 8,
  ])`

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
      <LinearBarsElement
        canvasProps={{
          chartName: 'chartH',
          width: 800,
          lowestViewableValue: 0,
          highestViewableValue: 35,
        }}
        orientation={EnumOrientation.HORIZONTAL}
      />,
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
      <LinearBarsElement
        canvasProps={{
          chartName: 'chartV',
          width: 800,
          lowestViewableValue: 0,
          highestViewableValue: 35,
        }}
        orientation={EnumOrientation.VERTICAL}
      />,
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
