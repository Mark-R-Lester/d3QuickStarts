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
import { BarStackedDefaultsChart } from './BarStackedDefaultsChart'
import { BarStackedChart } from './BarStackedChart'

const barDataAsString: string = `const data = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
]`

const barsVerticalAsString: string = `${barDataAsString}

const canvas: QsCanvas = qsCreateCanvas(canvasProps)

canvas.generate.linear.horizontal.barStack(data)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  {
    domainScale: QsEnumAxisScaleType.BANDED,
  }
)`

const barsHorizontalAsString: string = `${barDataAsString}

const canvas: QsCanvas = qsCreateCanvas(canvasProps)

canvas.generate.linear.horizontal.barStack(data)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  {
    domainScale: QsEnumAxisScaleType.BANDED,
  }
)`

const qsBarStackData: string = `number[][]`

const qsBarStackConfig: string = `export interface QsBarGroupConfig {
  [key: string]: number | Iterable<String> | undefined
  padding?: number
  colorRange?: Iterable<String>
}`

const qsBarStackDataExample: string = `const data = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
]`

const qsBarStackConfigExample: string = `const defaults: BarGroupConfigStrict = {
  colorRange: schemePurples[4],
  padding: 20,
}`

export const barStackedDetaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Bar stack with defaults</ContentTitle>,
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
                    {barsHorizontalAsString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <BarStackedDefaultsChart
              canvasProps={{
                chartName: 'barStackedDefaultsChart',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 150,
              }}
            />,
          ]}
        />
      </ContentBox>,
    ]}
  />
)

export const barStackedContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Bar Stack</ContentTitle>,
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
                    {barsVerticalAsString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <BarStackedChart
              canvasProps={{
                chartName: 'barStackedChart',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 150,
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
      <ContentTitle variant="h4">QsBarData interface</ContentTitle>,
      <ContentBox>
        <ContentRow
          elements={[
            <ContentColumn
              elements={[
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarStackData}
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
                    {qsBarStackDataExample}
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
                    {qsBarStackConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsBarStackConfigExample}
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
    initialCode={`const canvasConfig = {
  chartName: 'ChartEditable',
  width: 600,
  lowestViewableValue: 0,
  highestViewableValue: 125,
  borderColor: 'grey',
}

const data = [
  [10, 20, 16, 23],
  [16, 32, 30, 26],
  [40, 16, 12, 16],
  [10, 4, 13, 32],
  [10, 37, 21, 8],
  [10, 20, 16, 23],
  [10, 32, 30, 26],
  [15, 16, 12, 16],
  [10, 4, 13, 32],
]

const canvas: QsCanvas = qsCreateCanvas(canvasConfig)

canvas.generate.linear.horizontal.barStack(data)
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  {
    domainScale: QsEnumAxisScaleType.BANDED,
  }
)
`}
  ></ChartEditor>
)
