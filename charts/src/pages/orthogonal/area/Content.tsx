import { Typography } from '@mui/material'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ContentColumn } from '../../../components/atoms/content/ContentColumn'
import { OrthogonalAreaChart } from './OrthogonalAreaChart'
import { ContentRow } from '../../../components/atoms/content/ContentRow'
import {
  ContentBox,
  ContentSyntaxBox,
  ContentTextBox,
  ContentTitle,
} from '../../../components/atoms/content/ContentStyled'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { ChartEditor } from '../../../components/molecules/ChartEditor'
import { OrthogonalAreaStackedChart } from './OrthogonalAreaStackedChart'
import { QsEnumDataScale } from 'd3qs/d3QuickStart'

const canvasConfig: string = `const canvasConfig = {
  chartName: 'orthogonalArea',
  width: 600,
  highestViewableValue: 190,
} 
`

const defaultsChart: string = `
const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]

const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
canvas.generate.orthogonal.horizontal.area(
  { higherData: data1 }
)
canvas.generate.orthogonal.vertical.axis.left([])
canvas.generate.orthogonal.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  {
    domainScale: QsEnumAxisScaleType.POINT,
  }
)`

const configChart: string = `
const data1 = [15, 10, 20, 30, 40, 26, 90, 15, 102, 112, 156, 140]
const data2 = [25, 15, 40, 36, 80, 100, 96, 136, 125, 155, 170, 190]

const canvas: QsCanvasOrthogonal = qsCreateCanvas(canvasConfig)
canvas.generate.orthogonal.horizontal.area(
  { higherData: data1, fillColor: 'blue' },
  { curve: QsEnumCurve.NATURAL }
)
canvas.generate.orthogonal.horizontal.area(
  { higherData: data2, lowerData: data1, fillColor: 'red' },
  { curve: QsEnumCurve.NATURAL }
)
canvas.generate.orthogonal.vertical.axis.left([])
canvas.generate.orthogonal.horizontal.axis.bottom(
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  {
    domainScale: QsEnumAxisScaleType.POINT,
  }
)`

const defaultsChartAll: string = `${canvasConfig}${defaultsChart}`
const configChartAll: string = `${canvasConfig}${configChart}`

const data: string = `interface QsAreaData {
  lowerData?: number[]
  higherData: number[]
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeWidth?: number
  strokeOpacity?: number
}`

const config: string = `interface QsAreaConfig {
  [key: string]: CurveFactory | string | number | undefined
  curve?: QsEnumCurve
  defaultFillColor?: string
  defaultFillOpacity?: number
  defaultStrokeColor?: string
  defaultStrokeWidth?: number
  defaultStrokeOpacity?: number
  strokeLineJoin?: QsEnumLineJoin
  strokeLineCap?: QsEnumLineCap
}`

const dataExample: string = `const data: QsAreaData = {
  lowerData: [1, 2, 3, 4, 5, 6, 7, 8],
  higherData: number[2, 3, 4, 5, 6, 7, 8, 9],
  fillColor: 'blue',
  fillOpacity: 1,
  strokeColor: 'blue',
  strokeWidth: 2,
  strokeOpacity: 1,
}`

const configExample: string = `const config: QsAreaConfig = {
  curve: QsEnumCurve.LINEAR,
  defaultFillColor: 'blue',
  defaultFillOpacity: 1,
  defaultStrokeColor: 'blue',
  defaultStrokeWidth: number,
  defaultStrokeOpacity: 1,
  strokeLineJoin: QsEnumLineJoin.ROUND,
  strokeLineCap: QsEnumLineCap.ROUND,
}`

export const defaultsContent: JSX.Element = (
  <ContentColumn
    elements={[
      <ContentTitle variant="h4">Horizontal Bars</ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1"></Typography>
                  <Typography variant="body1">
                    The area is generated uses default settings and requires
                    just one line:
                  </Typography>
                  <Typography variant="body1">
                    canvas.generate.orthogonal.horizontal.area(&#123;
                    higherData: data1 &#125;)
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
            <OrthogonalAreaChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                lowestViewableValue: 9,
                highestViewableValue: 156,
                dataScale: { scale: QsEnumDataScale.LINEAR },
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
      <ContentTitle variant="h4">Horizontal Bars</ContentTitle>,
      <ContentBox>
        <ContentColumn
          elements={[
            <ContentRow
              elements={[
                <ContentTextBox>
                  <Typography variant="body1">
                    The area is generated uses default settings and requires
                    just one line:
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
            <OrthogonalAreaStackedChart
              canvasProps={{
                chartName: 'chartH',
                width: 600,
                lowestViewableValue: 0,
                highestViewableValue: 190,
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
                  {' '}
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
    highestViewableValue: 156,
    borderColor: 'grey',
  }

  ${configChart}
`}
  ></ChartEditor>
)
