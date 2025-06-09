import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { EnumOrientation } from '../../../common/enums'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { LinearLineDefaultsChart } from './LinearLineDefaultsChart'
import { LinearLineChart } from './LinearLineChart'

const linearLineDefaultsChartString: string = `const data = [25, 10, 35, 25, 35, 5, 25, 25]
const canvas: QsCanvas = qsCreateCanvas(canvasProps)
 canvas.generate.linear.horizontal.line({
  data,
})
canvas.generate.linear.vertical.axis.left([])
canvas.generate.linear.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8],
  {
    domainScale: QsEnumAxisScaleType.POINT,
  }
)`

const linearLineChartString: string = `const data = [25, 10, 35, 25, 35, 5, 25, 25]
const canvas: QsCanvas = qsCreateCanvas(canvasProps)
canvas.generate.linear.vertical.line({
  data,
  strokeColor: 'red',
  strokeWidth: 1,
})
canvas.generate.linear.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
  domainScale: QsEnumAxisScaleType.POINT,
})
canvas.generate.linear.horizontal.axis.bottom([])`

const qsLineData: string = `interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const qsLineConfig: string = `interface QsLineConfig {
  [key: string]: QsEnumCurve | number | string | undefined
  scaleType?: QsEnumScaleType
  curve?: QsEnumCurve
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const qsLineDataExample: string = `const data: QsLineData = {
  data: number[1, 2, 3, 4, 5],
  strokeOpacity?: number,
  strokeColor?: 'blue',
  strokeWidth?: 1
}`

const qsLineConfigExample: string = `const config: QsLineConfig = {
  scaleType: QsEnumScaleType.BANDED,
  curve: QsEnumCurve.NATURAL,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
}`

export const lineDefaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Line generated with defaults</ContentTitle>,
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
                    {linearLineChartString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <LinearLineDefaultsChart
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

export const lineContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Line customised</ContentTitle>,
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
                    {linearLineDefaultsChartString}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <LinearLineChart
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
                    {qsLineData}
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
                    {qsLineDataExample}
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
                <Typography variant="body1">Interface:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsLineConfig}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <ContentColumn
              elements={[
                <Typography variant="body1">Example:</Typography>,
                <ContentSyntaxBox>
                  <SyntaxHighlighter language="typescript" style={atomOneDark}>
                    {qsLineConfigExample}
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
const data = [25, 10, 35, 25, 35, 5, 25, 25]
const canvas: QsCanvas = qsCreateCanvas(canvasConfig)
canvas.generate.linear.vertical.line({
  data,
  strokeColor: 'red',
  strokeWidth: 1,
})
canvas.generate.linear.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
  domainScale: QsEnumAxisScaleType.POINT,
})
canvas.generate.linear.horizontal.axis.bottom([])
`}
  ></ChartEditor>
)
