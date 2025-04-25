import { Typography } from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColum'
import { ChartEditor } from './ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './SimpleBarChart'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import { ContentTitle } from '../../../components/atoms/content/ContentTitle'

const barDataAsString: string = `const barDataSimple: QsBarData[] =[
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]`

const barsVerticalAsString: string = `
${barDataAsString}

const canvas: QsCanvas = qsCreateCanvas(canvasProps)
canvas.generate.linear.vertical.bars(data, config)
canvas.generate.linear.horizontal.axis.bottom([0, 35])
canvas.generate.linear.vertical.axis.leftBanded([
  1, 2, 3, 4, 5, 6, 7, 8,
])
  
`

const barsHorizontalAsString: string = `
${barDataAsString}

const canvas: QsCanvas = qsCreateCanvas(canvasProps)
canvas.generate.linear.horizontal.bars(data, config)
canvas.generate.linear.vertical.axis.left([0, 35])
canvas.generate.linear.horizontal.axis.bottomBanded([
  1, 2, 3, 4, 5, 6, 7, 8,
])
  
`

const qsBarData: string = `interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const qsBarConfig: string = `interface QsBarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding?: number
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  fillColorScaleData?: QsColorScaleData
  strokeColorScaleData?: QsColorScaleData
}`

export const horizontalBarContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Horizontal Bars</ContentTitle>,
      <Typography variant="body1">
        Though it's clear the bars are vertical, the bars element when set to
        horizontal lays the bars out along the horizontal axis. This makes more
        sense when using other horizontal elements such as lines or points in
        conjunction with bars.
      </Typography>,

      <ContentRow
        elements={[
          <>
            <Typography variant="body1">
              Bars use the type QsBarData the only mandatory field is
              upperBoundry
            </Typography>
            <Typography variant="body1">
              The simplest bar chart can be created in just four lines of code,
              excluding data.
            </Typography>
          </>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {barsHorizontalAsString}
          </SyntaxHighlighter>,
        ]}
      />,

      <SimpleBarChart
        canvasProps={{
          chartName: 'chartH',
          width: 800,
          lowestViewableValue: 0,
          highestViewableValue: 35,
        }}
        orientation={EnumOrientation.HORIZONTAL}
      />,
    ]}
  ></ContentColumn>
)

export const verticalBarContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Vertical Bars</ContentTitle>,
      <Typography variant="body1">
        Though it's clear the bars are horizonal, the bars element when set to
        vertical lays the bars out along the vertical axis. This makes more
        sense when using other vertical elements such as lines or points in
        conjunction with bars.
      </Typography>,
      <ContentRow
        elements={[
          <>
            <Typography variant="body1">
              Bars use the type QsBarData the only mandatory field is
              upperBoundry
            </Typography>
            <Typography variant="body1">
              The simplest bar chart can be created in just four lines of code,
              excluding data.
            </Typography>
          </>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {barsVerticalAsString}
          </SyntaxHighlighter>,
        ]}
      />,
      <SimpleBarChart
        canvasProps={{
          chartName: 'chartV',
          width: 800,
          lowestViewableValue: 0,
          highestViewableValue: 35,
        }}
        orientation={EnumOrientation.VERTICAL}
      />,
    ]}
  ></ContentColumn>
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentRow
        elements={[
          <Typography variant="body1">QsBarData interface</Typography>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {qsBarData}
          </SyntaxHighlighter>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {qsBarConfig}
          </SyntaxHighlighter>,
        ]}
      ></ContentRow>,

      <ContentRow
        elements={[
          <Typography variant="body1">QsBarConfig interface</Typography>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {qsBarConfig}
          </SyntaxHighlighter>,
          <SyntaxHighlighter language="typescript" style={atomOneDark}>
            {qsBarConfig}
          </SyntaxHighlighter>,
        ]}
      ></ContentRow>,
      <SimpleBarChart
        canvasProps={{
          chartName: 'chartV',
          width: 800,
          lowestViewableValue: 0,
          highestViewableValue: 35,
        }}
        orientation={EnumOrientation.VERTICAL}
      />,
    ]}
  ></ContentColumn>
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
