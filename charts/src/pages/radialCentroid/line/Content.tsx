import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { RadialLineDefaultsChart } from './RadialLineDefaultsChart'
import { RadialLineChart } from './RadialLineChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 25,
  borderColor: 'grey',
}`

const defaultsChart: string = `
const data: number[] = [
  16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 
  20, 17, 16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16,
]

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.line({ data })`

const configChart: string = `
const data: number[] = [
  16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16, 17, 18, 
  20, 17, 16, 17, 18, 20, 17, 23, 23, 20, 17, 16, 16,
]

const canvas: QsCanvasRadial = qsCreateCanvasRadial(canvasConfig)
canvas.generate.radialCentroid.line(
  { data, strokeColor: 'green' }
)`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsRadialAreaData {
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const config: string = `interface QsRadialAreaConfig {
  x?: number
  y?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  curve?: QsEnumCurve
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsPlottedLineData = {
  data: [15, 15, 15, 17, 16],
  strokeColor: 'blue'
  strokeWidth: 1,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsRadialAreaConfig = {
  x: 50,
  y: 50,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  curve: QsEnumCurve.NATURAL,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
}`

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Text generated with defaults</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
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
            <RadialLineDefaultsChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                highestViewableValue: 25,
                borderColor: 'grey',
              }}
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
      <ContentTitle variant="h4">Text customised</ContentTitle>,
      <ContentBox>
        <Typography variant="body1">content</Typography>
      </ContentBox>,

      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">content</Typography>
                  <Typography variant="body1">content</Typography>
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
            <RadialLineChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 25,
                borderColor: 'grey',
              }}
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
      <ContentTitle variant="h4">QsTextData interface</ContentTitle>,
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
      <ContentTitle variant="h4">QsTextConfig interface</ContentTitle>,
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
  highestViewableValue: 25,
  borderColor: 'grey',
}
${configChart}`}
  ></ChartEditor>
)
