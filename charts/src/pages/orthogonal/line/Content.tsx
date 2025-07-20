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
import { OrthogonalLineDefaultsChart } from './OrthogonalLineDefaultsChart'
import { OrthogonalLineChart } from './OrthogonalLineChart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'chart',
  width: 600,
  highestViewableValue: 40,
} 
`

const defaultsChart: string = `const data = [25, 10, 35, 25, 35, 5, 25, 25]
const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
 canvas.generate.orthogonal.horizontal.line({
  data,
})
canvas.generate.orthogonal.vertical.axis.left([])
canvas.generate.orthogonal.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8],
  {
    domainScale: QsEnumAxisScaleType.POINT,
  }
)`

const configChart: string = `const data = [25, 10, 35, 25, 35, 5, 25, 25]
const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
canvas.generate.orthogonal.vertical.line({
  data,
  strokeColor: 'red',
  strokeWidth: 1,
})
canvas.generate.orthogonal.vertical.axis.left([1, 2, 3, 4, 5, 6, 7, 8], {
  domainScale: QsEnumAxisScaleType.POINT,
})
canvas.generate.orthogonal.horizontal.axis.bottom([])`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsLineData {
  [key: string]: number[] | string | number | undefined
  data: number[]
  strokeOpacity?: number
  strokeColor?: string
  strokeWidth?: number
}`

const config: string = `interface QsLineConfig {
  [key: string]: QsEnumCurve | number | string | undefined
  scaleType?: QsEnumScaleType
  curve?: QsEnumCurve
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsLineData = {
  data: number[1, 2, 3, 4, 5],
  strokeOpacity?: number,
  strokeColor?: 'blue',
  strokeWidth?: 1
}`

const configExample: string = `const config: QsLineConfig = {
  scaleType: QsEnumScaleType.BANDED,
  curve: QsEnumCurve.NATURAL,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: 1,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
}`

export const defaultsContent: JSX.Element = (
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
                    {defaultsChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <OrthogonalLineDefaultsChart
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
                    {configChartAll}
                  </SyntaxHighlighter>
                </ContentSyntaxBox>,
              ]}
            />,
            <OrthogonalLineChart
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
                <Typography variant="body1">Interface:</Typography>,
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
