import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
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

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`

const barDataAsString: string = `const data: QsBarData[] = [
  { upperBoundry: 35, lowerBoundry: 5 },
  { upperBoundry: 35, lowerBoundry: 10 },
  { upperBoundry: 30, lowerBoundry: 15 },
  { upperBoundry: 25 },
  { upperBoundry: 20 },
  { upperBoundry: 15 },
  { upperBoundry: 10 },
  { upperBoundry: 5 },
]`

const defaultsChart: string = `${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
canvas.generate.linear.vertical.bars(data)
canvas.generate.linear.horizontal.axis.bottom([])
canvas.generate.linear.vertical.axis.left(
  [ 1, 2, 3, 4, 5, 6, 7, 8,], 
  { domainScale: QsEnumAxisScaleType.BANDED }
)`

const configChart: string = `${barDataAsString}

const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
canvas.generate.linear.horizontal.bars(data)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom(
  [ 1, 2, 3, 4, 5, 6, 7, 8,], 
  { domainScale: QsEnumAxisScaleType.BANDED }
)`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsBarData {
  lowerBoundry?: number
  upperBoundry: number
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsBarConfig {
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

const dataExample: string = `const data: QsBarData = {
  lowerBoundry: 0,
  upperBoundry: 100,
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 0.1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsBarConfig = {
  padding: 0,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 0.1,
  defaultStrokeOpacity: 1,
  fillColorScaleData: {
      domain: [1, 100],
      range: ['lightblue', 'darkblue'],
      type: QsEnumColorScale.SEQUENTIAL,
    },
  strokeColorScaleData:{
      domain: [1, 100],
      range: ['lightblue', 'darkblue'],
      type: QsEnumColorScale.SEQUENTIAL,
    },
}`

export const defaultsContent: JSX.Element = (
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
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {defaultsChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <SimpleBarChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
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

export const configContent: JSX.Element = (
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
                  <SyntaxHighlighter
                    language="typescript"
                    style={atomOneDark}
                    showLineNumbers={true}
                  >
                    {configChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <SimpleBarChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
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
                    {data}
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
                    {dataExample}
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
                    {config}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {configExample}
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
const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 35,
  borderColor: 'grey',
}
${defaultsChart}`}
  ></ChartEditor>
)
