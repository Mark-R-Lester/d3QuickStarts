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
import { PlottedTextChart } from './PlottedTextChart'
import { PlottedTextDefaultsChart } from './PlottedTextDefaultsChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  highestViewableValue: 35,
}`

const defaultsChart: string = `
const canvas: QsCanvas = qsCreateCanvas(canvasConfig)

const data: QsPlottedTextData[] = [
  { x: 0, y: 0, text: 'Text with no config uses defaults' },
]
canvas.generate.plotted.text(data)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom([])`

const configChart: string = `
const canvas: QsCanvas = qsCreateCanvas(canvasConfig)

const data: QsPlottedTextData[] = [
  { x: 0, y: 0, text: 'Text with no config uses defaults' },
]
canvas.generate.plotted.text(data)

const data1: QsPlottedTextData[] = [
  { x: 0, y: 10, text: 'Three pieces of' },
  { x: 15, y: 20, text: 'text in one call' },
  { x: 30, y: 30, text: 'utilise on the same config' },
]

canvas.generate.plotted.text(data1, {
  defualtTextFont: QsEnumTextFont.FANTASY,
  defualtTextFontSize: 10,
  defualtTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defualtTextStroke: 'red',
})

const data2: QsPlottedTextData[] = [
  { x: 0, y: 50, text: 'Text in separate call uses separate config' },
]
canvas.generate.plotted.text(data2, {
  defualtTextFont: QsEnumTextFont.HELVETICA,
  defualtTextFontSize: 7,
  defualtTextFontWeight: QsEnumTextFontWeight.BOLD,
  defualtTextFill: 'blue',
  defualtTextAngle: 10,
})
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom([])`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsPlottedTextData {
  x: number,
  y: number,
  text: string
}`

const config: string = `interface QsPlottedTextConfig {
  defualtTextFont?: QsEnumTextFont | string
  defualtTextFontSize?: number
  defualtTextFontStyle?: QsEnumTextFontStyle
  defualtTextFontWeight?: QsEnumTextFontWeight | number
  defualtTextDecorationLine?: QsEnumTextDecorationLine
  defualtTextFill?: string
  defualtTextAngle?: number
  defualtTextAnchor?: QsEnumTextAnchor
  defualtTextStroke?: string
  defualtTextAlignmentBaseline?: QsEnumAlignmentBaseline
}`

const dataExample: string = `const data: QsPlottedTextData = {
  x: 10,
  y: 20,
  text: 'hello world'
}`

const configExample: string = `const config: QsPlottedTextConfig = {
  defualtTextFont?: QsEnumTextFont.SANS_SERIF
  defualtTextFontSize: 10,
  defualtTextFontStyle: QsEnumTextFontStyle.ITALIC,
  defualtTextFontWeight: QsEnumTextFontWeight.BOLD,
  defualtTextDecorationLine: QsEnumTextDecorationLine.OVERLINE,
  defualtTextFill: 'blue',
  defualtTextAngle: 45,
  defualtTextAnchor: QsEnumTextAnchor.START,
  defualtTextStroke:  'blue',
  defualtTextAlignmentBaseline: QsEnumAlignmentBaseline.CENTER,
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
            <PlottedTextDefaultsChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                highestViewableValue: 35,
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
            <PlottedTextChart
              canvasProps={{
                chartName: 'chartV',
                width: 600,
                highestViewableValue: 100,
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
  highestViewableValue: 35,
  borderColor: 'grey',
}
${configChart}`}
  ></ChartEditor>
)
