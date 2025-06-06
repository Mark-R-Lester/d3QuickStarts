import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from './ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { SimpleBarChart } from './SimpleBarChart'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'

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

const qsBarDataExample: string = `interface QsBarData {
  lowerBoundry: 0
  upperBoundry: 100
  fillColor: 'blue'
  fillOpacity: 1
  strokeColor: 'blue'
  strokeWidth: 0.1
  strokeOpacity: 1
}`

const qsBarConfigExample: string = `interface QsBarConfig {
  [key: string]: number | string | QsColorScaleData | undefined
  padding: 0
  defaultFillColor: 'blue'
  defaultFillOpacity: 1
  defaultStrokeColor: 'blue'
  defaultStrokeWidth: 0.1
  defaultStrokeOpacity: 1
  fillColorScaleData: {
      domain: [1, 100],
      range: ['lightblue', 'darkblue'],
      type: QsEnumColorScale.SEQUENTIAL,
    }
  strokeColorScaleData:{
      domain: [1, 100],
      range: ['lightblue', 'darkblue'],
      type: QsEnumColorScale.SEQUENTIAL,
    }
}`

export const horizontalBarContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Horizontal Bars</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">
          Though it's clear the bars are vertical, the bars element when set to
          horizontal lays the bars out along the horizontal axis. This makes
          more sense when using other horizontal elements such as lines or
          points in conjunction with bars.
        </Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    Bars use the type QsBarData the only mandatory field is
                    upperBoundry
                  </Typography>
                  <Typography variant="body1">
                    The simplest bar chart can be created in just four lines of
                    code, excluding data.
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {barsHorizontalAsString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
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
        />
      </ContentBox>,
    ]}
  />
)

export const verticalBarContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Vertical Bars</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">
          Though it's clear the bars are horizonal, the bars element when set to
          vertical lays the bars out along the vertical axis. This makes more
          sense when using other vertical elements such as lines or points in
          conjunction with bars.
        </Typography>
      </ContentBox>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    Bars use the type QsBarData the only mandatory field is
                    upperBoundry
                  </Typography>
                  <Typography variant="body1">
                    The simplest bar chart can be created in just four lines of
                    code, excluding data.
                  </Typography>
                </ContentTextBox>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {barsVerticalAsString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
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
        />
      </ContentBox>,
    ]}
  />
)

export const configAndData: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">QsBarData interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarData}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarDataExample}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
      <ContentTitle variant="h4">QsBarConfig interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  {' '}
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarConfigExample}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
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
